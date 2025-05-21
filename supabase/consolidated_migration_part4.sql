-- ==============================
-- Consolidated Migration File (Part 4)
-- Event Management and RSVP System
-- ==============================

-- This file consolidates the following migration files:
-- * 20250311010002_event_rsvp_system.sql

-- ==============================
-- Event RSVP System (from 20250311010002_event_rsvp_system.sql)
-- ==============================

-- =====================================
-- 1. Update Event Participants Table
-- =====================================

-- Add response fields for more detailed RSVP status
ALTER TABLE public.event_participants
ADD COLUMN IF NOT EXISTS response_message TEXT,
ADD COLUMN IF NOT EXISTS notification_preference TEXT DEFAULT 'all';

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_event_participants_event_id ON public.event_participants(event_id);
CREATE INDEX IF NOT EXISTS idx_event_participants_user_id ON public.event_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_event_participants_status ON public.event_participants(status);

-- =====================================
-- 2. Create Event Reminder Table
-- =====================================

CREATE TABLE IF NOT EXISTS public.event_reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reminder_time TIMESTAMPTZ NOT NULL,
  sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(event_id, user_id, reminder_time)
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_event_reminders_event_id ON public.event_reminders(event_id);
CREATE INDEX IF NOT EXISTS idx_event_reminders_user_id ON public.event_reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_event_reminders_reminder_time ON public.event_reminders(reminder_time);
CREATE INDEX IF NOT EXISTS idx_event_reminders_sent ON public.event_reminders(sent);

-- Enable RLS
ALTER TABLE public.event_reminders ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own reminders"
ON public.event_reminders FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reminders"
ON public.event_reminders FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders"
ON public.event_reminders FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders"
ON public.event_reminders FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- =====================================
-- 3. Create Event Waitlist Table
-- =====================================

CREATE TABLE IF NOT EXISTS public.event_waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  position INTEGER NOT NULL,
  status TEXT DEFAULT 'waiting' NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(event_id, user_id)
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_event_waitlist_event_id ON public.event_waitlist(event_id);
CREATE INDEX IF NOT EXISTS idx_event_waitlist_user_id ON public.event_waitlist(user_id);
CREATE INDEX IF NOT EXISTS idx_event_waitlist_position ON public.event_waitlist(position);
CREATE INDEX IF NOT EXISTS idx_event_waitlist_status ON public.event_waitlist(status);

-- Enable RLS
ALTER TABLE public.event_waitlist ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own waitlist entries"
ON public.event_waitlist FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Event creators can view all waitlist entries for their events"
ON public.event_waitlist FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.events
    WHERE id = event_id
    AND creator_id = auth.uid()
  )
);

CREATE POLICY "Users can add themselves to waitlists"
ON public.event_waitlist FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Add updated_at timestamp trigger
CREATE TRIGGER handle_event_waitlist_updated_at
BEFORE UPDATE ON public.event_waitlist
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- =====================================
-- 4. RSVP and Waitlist Management Functions
-- =====================================

-- Function to handle RSVPs
CREATE OR REPLACE FUNCTION public.rsvp_to_event(
  p_event_id UUID,
  p_status TEXT,
  p_response_message TEXT DEFAULT NULL,
  p_notification_preference TEXT DEFAULT 'all'
)
RETURNS JSONB AS $$
DECLARE
  v_event RECORD;
  v_current_participants INTEGER;
  v_max_participants INTEGER;
  v_user_id UUID;
  v_existing_participant RECORD;
  v_waitlist_position INTEGER;
  v_result JSONB;
BEGIN
  -- Get the current user ID
  v_user_id := auth.uid();
  
  -- Check if the event exists and get its details
  SELECT e.*, 
         (SELECT COUNT(*) FROM public.event_participants 
          WHERE event_id = e.id AND status = 'attending') AS current_participants
  INTO v_event
  FROM public.events e
  WHERE e.id = p_event_id;
  
  IF v_event.id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Event not found'
    );
  END IF;
  
  -- Check if the event has already happened
  IF v_event.start_date < NOW() THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Cannot RSVP to an event that has already started'
    );
  END IF;
  
  -- Check if the event is canceled
  IF v_event.status = 'canceled' THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Cannot RSVP to a canceled event'
    );
  END IF;
  
  -- Check if the user is already on the waitlist
  IF EXISTS (
    SELECT 1 FROM public.event_waitlist
    WHERE event_id = p_event_id AND user_id = v_user_id
  ) AND p_status = 'attending' THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'You are already on the waitlist for this event'
    );
  END IF;
  
  -- Check if the user already has an RSVP
  SELECT * INTO v_existing_participant
  FROM public.event_participants
  WHERE event_id = p_event_id AND user_id = v_user_id;
  
  -- If changing status from attending to not attending, simply update
  IF v_existing_participant.id IS NOT NULL AND 
     v_existing_participant.status = 'attending' AND 
     p_status != 'attending' THEN
    
    UPDATE public.event_participants
    SET status = p_status,
        response_message = COALESCE(p_response_message, response_message),
        notification_preference = COALESCE(p_notification_preference, notification_preference),
        updated_at = NOW()
    WHERE id = v_existing_participant.id;
    
    -- Process waitlist if there is one
    PERFORM public.process_event_waitlist(p_event_id);
    
    RETURN jsonb_build_object(
      'success', true,
      'message', 'RSVP updated',
      'status', p_status
    );
  END IF;
  
  -- Check capacity constraints for 'attending' status
  IF p_status = 'attending' THEN
    -- Get max participants (if null, treat as unlimited)
    v_max_participants := v_event.max_participants;
    
    -- Check if event is at capacity
    IF v_max_participants IS NOT NULL AND v_event.current_participants >= v_max_participants THEN
      -- Add to waitlist instead
      SELECT COALESCE(MAX(position), 0) + 1 
      INTO v_waitlist_position
      FROM public.event_waitlist 
      WHERE event_id = p_event_id;
      
      INSERT INTO public.event_waitlist (
        event_id,
        user_id,
        position,
        status
      )
      VALUES (
        p_event_id,
        v_user_id,
        v_waitlist_position,
        'waiting'
      )
      ON CONFLICT (event_id, user_id) 
      DO UPDATE SET
        position = v_waitlist_position,
        status = 'waiting',
        updated_at = NOW();
      
      RETURN jsonb_build_object(
        'success', true,
        'message', 'Event is at capacity. You have been added to the waitlist',
        'waitlist_position', v_waitlist_position
      );
    END IF;
  END IF;
  
  -- Insert or update RSVP
  IF v_existing_participant.id IS NULL THEN
    INSERT INTO public.event_participants (
      event_id,
      user_id,
      status,
      response_message,
      notification_preference
    )
    VALUES (
      p_event_id,
      v_user_id,
      p_status,
      p_response_message,
      p_notification_preference
    );
    
    v_result := jsonb_build_object(
      'success', true,
      'message', 'RSVP created',
      'status', p_status
    );
  ELSE
    UPDATE public.event_participants
    SET status = p_status,
        response_message = COALESCE(p_response_message, response_message),
        notification_preference = COALESCE(p_notification_preference, notification_preference),
        updated_at = NOW()
    WHERE id = v_existing_participant.id;
    
    v_result := jsonb_build_object(
      'success', true,
      'message', 'RSVP updated',
      'status', p_status
    );
  END IF;
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to process the waitlist when a spot opens up
CREATE OR REPLACE FUNCTION public.process_event_waitlist(p_event_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_event RECORD;
  v_spots_available INTEGER;
  v_promoted_count INTEGER := 0;
  v_waitlist_user RECORD;
BEGIN
  -- Get event details and current attendee count
  SELECT e.*, 
         COALESCE(e.max_participants, 0) AS max_participants,
         (SELECT COUNT(*) FROM public.event_participants 
          WHERE event_id = e.id AND status = 'attending') AS current_participants
  INTO v_event
  FROM public.events e
  WHERE e.id = p_event_id;
  
  -- If no max capacity or event is canceled, exit
  IF v_event.max_participants = 0 OR v_event.status = 'canceled' THEN
    RETURN 0;
  END IF;
  
  -- Calculate available spots
  v_spots_available := v_event.max_participants - v_event.current_participants;
  
  -- If no spots available, exit
  IF v_spots_available <= 0 THEN
    RETURN 0;
  END IF;
  
  -- Process waitlist in order
  FOR v_waitlist_user IN
    SELECT * FROM public.event_waitlist
    WHERE event_id = p_event_id AND status = 'waiting'
    ORDER BY position ASC
    LIMIT v_spots_available
  LOOP
    -- Move from waitlist to participants
    INSERT INTO public.event_participants (
      event_id,
      user_id,
      status,
      notification_preference
    )
    VALUES (
      p_event_id,
      v_waitlist_user.user_id,
      'attending',
      'all'
    )
    ON CONFLICT (event_id, user_id) 
    DO UPDATE SET
      status = 'attending',
      updated_at = NOW();
    
    -- Update waitlist status
    UPDATE public.event_waitlist
    SET status = 'promoted',
        updated_at = NOW()
    WHERE id = v_waitlist_user.id;
    
    -- Insert a notification about being promoted from waitlist
    INSERT INTO public.notifications (
      user_id,
      type,
      content,
      reference_id,
      reference_table
    )
    VALUES (
      v_waitlist_user.user_id,
      'event_waitlist_promoted',
      format('You have been moved from the waitlist to the attendee list for event: %s', v_event.title),
      p_event_id,
      'events'
    );
    
    v_promoted_count := v_promoted_count + 1;
  END LOOP;
  
  RETURN v_promoted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================
-- 5. Event Reminder Functions
-- =====================================

-- Function to set a reminder for an event
CREATE OR REPLACE FUNCTION public.set_event_reminder(
  p_event_id UUID,
  p_reminder_time TIMESTAMPTZ
)
RETURNS JSONB AS $$
DECLARE
  v_event RECORD;
  v_user_id UUID;
BEGIN
  -- Get the current user ID
  v_user_id := auth.uid();
  
  -- Check if the event exists
  SELECT * INTO v_event
  FROM public.events
  WHERE id = p_event_id;
  
  IF v_event.id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Event not found'
    );
  END IF;
  
  -- Check that reminder time is in the future and before the event
  IF p_reminder_time <= NOW() THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Reminder time must be in the future'
    );
  END IF;
  
  IF p_reminder_time >= v_event.start_date THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Reminder time must be before the event starts'
    );
  END IF;
  
  -- Insert or update reminder
  INSERT INTO public.event_reminders (
    event_id,
    user_id,
    reminder_time,
    sent
  )
  VALUES (
    p_event_id,
    v_user_id,
    p_reminder_time,
    FALSE
  )
  ON CONFLICT (event_id, user_id, reminder_time) 
  DO UPDATE SET
    sent = FALSE;
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Reminder set successfully',
    'reminder_time', p_reminder_time
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get due reminders for processing
CREATE OR REPLACE FUNCTION public.get_due_event_reminders(p_limit INTEGER DEFAULT 100)
RETURNS SETOF public.event_reminders AS $$
BEGIN
  RETURN QUERY
  SELECT er.*
  FROM public.event_reminders er
  JOIN public.events e ON er.event_id = e.id
  WHERE er.sent = FALSE
    AND er.reminder_time <= NOW()
    AND e.status != 'canceled'
    AND e.start_date > NOW()
  ORDER BY er.reminder_time ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark a reminder as sent
CREATE OR REPLACE FUNCTION public.mark_reminder_sent(p_reminder_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.event_reminders
  SET sent = TRUE
  WHERE id = p_reminder_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================
-- 6. Event Capacity Management
-- =====================================

-- Function to check and update event capacity
CREATE OR REPLACE FUNCTION public.check_event_capacity(p_event_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_event RECORD;
  v_attendees INTEGER;
  v_waitlist_count INTEGER;
  v_capacity_percentage NUMERIC;
BEGIN
  -- Get event details and current attendee count
  SELECT e.*, 
         COALESCE(e.max_participants, 0) AS max_participants
  INTO v_event
  FROM public.events e
  WHERE e.id = p_event_id;
  
  -- Get current attendee count
  SELECT COUNT(*) INTO v_attendees
  FROM public.event_participants
  WHERE event_id = p_event_id AND status = 'attending';
  
  -- Get waitlist count
  SELECT COUNT(*) INTO v_waitlist_count
  FROM public.event_waitlist
  WHERE event_id = p_event_id AND status = 'waiting';
  
  -- If no max capacity, return full data
  IF v_event.max_participants = 0 THEN
    RETURN jsonb_build_object(
      'event_id', p_event_id,
      'attendees', v_attendees,
      'max_participants', NULL,
      'has_capacity', TRUE,
      'capacity_percentage', NULL,
      'waitlist_count', v_waitlist_count
    );
  END IF;
  
  -- Calculate capacity percentage
  v_capacity_percentage := (v_attendees::NUMERIC / v_event.max_participants::NUMERIC) * 100;
  
  -- Return capacity data
  RETURN jsonb_build_object(
    'event_id', p_event_id,
    'attendees', v_attendees,
    'max_participants', v_event.max_participants,
    'has_capacity', v_attendees < v_event.max_participants,
    'capacity_percentage', v_capacity_percentage,
    'waitlist_count', v_waitlist_count
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================
-- 7. Event Notifications
-- =====================================

-- Function to handle event time change notifications
CREATE OR REPLACE FUNCTION public.notify_event_time_change()
RETURNS TRIGGER AS $$
DECLARE
  r RECORD;
BEGIN
  -- Only if the start date or end date has changed
  IF (OLD.start_date != NEW.start_date OR OLD.end_date != NEW.end_date) THEN
    -- Notify all participants
    FOR r IN
      SELECT user_id, notification_preference
      FROM public.event_participants
      WHERE event_id = NEW.id
        AND status = 'attending'
        AND notification_preference IN ('all', 'important')
    LOOP
      -- Insert a notification
      INSERT INTO public.notifications (
        user_id,
        type,
        content,
        reference_id,
        reference_table
      )
      VALUES (
        r.user_id,
        'event_time_changed',
        format('Event time for "%s" has been updated.', NEW.title),
        NEW.id,
        'events'
      );
    END LOOP;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for event time changes
DROP TRIGGER IF EXISTS event_time_change_notifier ON public.events;
CREATE TRIGGER event_time_change_notifier
AFTER UPDATE OF start_date, end_date ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.notify_event_time_change();

-- Function to handle event cancellation notifications
CREATE OR REPLACE FUNCTION public.notify_event_cancellation()
RETURNS TRIGGER AS $$
DECLARE
  r RECORD;
BEGIN
  -- Only if the event status changed to canceled
  IF (OLD.status != 'canceled' AND NEW.status = 'canceled') THEN
    -- Notify all participants
    FOR r IN
      SELECT user_id, notification_preference
      FROM public.event_participants
      WHERE event_id = NEW.id
        AND notification_preference IN ('all', 'important')
    LOOP
      -- Insert a notification
      INSERT INTO public.notifications (
        user_id,
        type,
        content,
        reference_id,
        reference_table
      )
      VALUES (
        r.user_id,
        'event_canceled',
        format('Event "%s" has been canceled.', NEW.title),
        NEW.id,
        'events'
      );
    END LOOP;
    
    -- Also notify everyone on the waitlist
    FOR r IN
      SELECT user_id
      FROM public.event_waitlist
      WHERE event_id = NEW.id
        AND status = 'waiting'
    LOOP
      -- Insert a notification
      INSERT INTO public.notifications (
        user_id,
        type,
        content,
        reference_id,
        reference_table
      )
      VALUES (
        r.user_id,
        'event_canceled',
        format('Event "%s" that you were waitlisted for has been canceled.', NEW.title),
        NEW.id,
        'events'
      );
      
      -- Update waitlist status
      UPDATE public.event_waitlist
      SET status = 'canceled',
          updated_at = NOW()
      WHERE event_id = NEW.id
        AND user_id = r.user_id;
    END LOOP;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for event cancellations
DROP TRIGGER IF EXISTS event_cancellation_notifier ON public.events;
CREATE TRIGGER event_cancellation_notifier
AFTER UPDATE OF status ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.notify_event_cancellation();

-- =====================================
-- 8. Event Views
-- =====================================

-- Create event statistics view
CREATE OR REPLACE VIEW public.event_stats AS
WITH event_counts AS (
  SELECT
    e.id,
    e.title,
    e.creator_id,
    e.start_date,
    e.max_participants,
    (
      SELECT COUNT(*)
      FROM public.event_participants ep
      WHERE ep.event_id = e.id AND ep.status = 'attending'
    ) AS attending_count,
    (
      SELECT COUNT(*)
      FROM public.event_participants ep
      WHERE ep.event_id = e.id AND ep.status = 'maybe'
    ) AS maybe_count,
    (
      SELECT COUNT(*)
      FROM public.event_participants ep
      WHERE ep.event_id = e.id AND ep.status = 'not_attending'
    ) AS declined_count,
    (
      SELECT COUNT(*)
      FROM public.event_waitlist ew
      WHERE ew.event_id = e.id AND ew.status = 'waiting'
    ) AS waitlist_count
  FROM
    public.events e
  WHERE
    e.status != 'canceled'
)
SELECT
  id,
  title,
  creator_id,
  start_date,
  max_participants,
  attending_count,
  maybe_count,
  declined_count,
  waitlist_count,
  CASE
    WHEN max_participants IS NULL THEN 0
    ELSE (attending_count::NUMERIC / max_participants::NUMERIC) * 100
  END AS capacity_percentage,
  CASE
    WHEN max_participants IS NULL THEN true
    ELSE attending_count < max_participants
  END AS has_available_capacity
FROM
  event_counts;

-- Create a view for user events
CREATE OR REPLACE VIEW public.user_events AS
SELECT
  e.*,
  ep.status AS rsvp_status,
  ep.user_id,
  CASE
    WHEN ew.id IS NOT NULL THEN ew.position
    ELSE NULL
  END AS waitlist_position
FROM
  public.events e
LEFT JOIN
  public.event_participants ep ON e.id = ep.event_id
LEFT JOIN
  public.event_waitlist ew ON e.id = ew.event_id AND ep.user_id = ew.user_id
WHERE
  ep.user_id IS NOT NULL; 