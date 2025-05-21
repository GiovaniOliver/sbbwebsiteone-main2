-- ==============================
-- Migration File: Event RSVP System
-- Date: 2025-03-11
-- Description: Implementing RSVP functionality for events
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

CREATE POLICY "Users can delete their own reminders"
ON public.event_reminders FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- =====================================
-- 3. Create Event Wait List Table
-- =====================================

CREATE TABLE IF NOT EXISTS public.event_waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  position INTEGER NOT NULL,
  join_time TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  status TEXT DEFAULT 'waiting',
  notification_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
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
CREATE POLICY "Users can view waitlists for events they're interested in"
ON public.event_waitlist FOR SELECT
TO authenticated
USING (
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.events
    WHERE id = event_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can add themselves to waitlists"
ON public.event_waitlist FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Event creators can update waitlist status"
ON public.event_waitlist FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.events
    WHERE id = event_id AND user_id = auth.uid()
  )
);

-- =====================================
-- 4. Update Event Participants RLS
-- =====================================

-- Enable RLS on event_participants if not already enabled
ALTER TABLE public.event_participants ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view all event participants"
ON public.event_participants FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Users can RSVP to events"
ON public.event_participants FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own RSVP"
ON public.event_participants FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel their own RSVP"
ON public.event_participants FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- =====================================
-- 5. Create RSVP Functions
-- =====================================

-- Function to RSVP to an event with validation
CREATE OR REPLACE FUNCTION public.rsvp_to_event(
  p_event_id UUID,
  p_status TEXT DEFAULT 'attending',
  p_response_message TEXT DEFAULT NULL,
  p_notification_preference TEXT DEFAULT 'all'
)
RETURNS UUID AS $$
DECLARE
  v_user_id UUID;
  v_event public.events%ROWTYPE;
  v_participant_count INTEGER;
  v_participant_id UUID;
  v_waitlist_position INTEGER;
  v_waitlist_id UUID;
BEGIN
  -- Get current user
  v_user_id := auth.uid();
  
  -- Get event details
  SELECT * INTO v_event FROM public.events WHERE id = p_event_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Event not found';
  END IF;
  
  -- Check if event has already ended
  IF v_event.end_date < NOW() THEN
    RAISE EXCEPTION 'Cannot RSVP to past events';
  END IF;
  
  -- Check if user is already RSVP'd
  IF EXISTS (
    SELECT 1 FROM public.event_participants
    WHERE event_id = p_event_id AND user_id = v_user_id
  ) THEN
    -- Update existing RSVP
    UPDATE public.event_participants
    SET 
      status = p_status,
      response_message = p_response_message,
      notification_preference = p_notification_preference,
      updated_at = NOW()
    WHERE event_id = p_event_id AND user_id = v_user_id
    RETURNING id INTO v_participant_id;
    
    -- If changing to not attending, check if anyone from waitlist can be moved up
    IF p_status = 'declined' OR p_status = 'maybe' THEN
      PERFORM public.process_event_waitlist(p_event_id);
    END IF;
    
    RETURN v_participant_id;
  END IF;
  
  -- Check if event is full
  IF v_event.max_participants IS NOT NULL THEN
    SELECT COUNT(*) INTO v_participant_count
    FROM public.event_participants
    WHERE event_id = p_event_id AND status = 'attending';
    
    IF v_participant_count >= v_event.max_participants AND p_status = 'attending' THEN
      -- Event is full, add to waitlist
      SELECT COALESCE(MAX(position), 0) + 1 INTO v_waitlist_position
      FROM public.event_waitlist
      WHERE event_id = p_event_id;
      
      INSERT INTO public.event_waitlist (
        event_id, user_id, position, status
      ) VALUES (
        p_event_id, v_user_id, v_waitlist_position, 'waiting'
      ) RETURNING id INTO v_waitlist_id;
      
      -- Create notification for waitlist
      INSERT INTO public.notifications (
        user_id, type, content, reference_id, reference_type
      ) VALUES (
        v_user_id, 'event_waitlist', 
        'You have been added to the waitlist for "' || v_event.title || '"', 
        p_event_id, 'event'
      );
      
      RETURN v_waitlist_id; -- Return waitlist ID to signify user was added to waitlist
    END IF;
  END IF;
  
  -- Add new RSVP
  INSERT INTO public.event_participants (
    event_id, user_id, status, response_message, notification_preference
  ) VALUES (
    p_event_id, v_user_id, p_status, p_response_message, p_notification_preference
  ) RETURNING id INTO v_participant_id;
  
  -- Create notification for event creator
  INSERT INTO public.notifications (
    user_id, actor_id, type, content, reference_id, reference_type
  ) VALUES (
    v_event.user_id, v_user_id, 'event_rsvp', 
    CASE 
      WHEN p_status = 'attending' THEN 'Someone is attending your event "' || v_event.title || '"'
      WHEN p_status = 'maybe' THEN 'Someone might attend your event "' || v_event.title || '"'
      ELSE 'Someone responded to your event "' || v_event.title || '"'
    END,
    p_event_id, 'event'
  );
  
  RETURN v_participant_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to process waitlist when slots open up
CREATE OR REPLACE FUNCTION public.process_event_waitlist(p_event_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_event public.events%ROWTYPE;
  v_current_participants INTEGER;
  v_slots_available INTEGER;
  v_promoted_count INTEGER := 0;
  v_waitlist_user RECORD;
BEGIN
  -- Get event details
  SELECT * INTO v_event FROM public.events WHERE id = p_event_id;
  IF NOT FOUND OR v_event.max_participants IS NULL THEN
    RETURN 0; -- No event or no max participants limit
  END IF;
  
  -- Count current participants
  SELECT COUNT(*) INTO v_current_participants
  FROM public.event_participants
  WHERE event_id = p_event_id AND status = 'attending';
  
  -- Calculate available slots
  v_slots_available := v_event.max_participants - v_current_participants;
  
  -- Process waitlist if slots are available
  IF v_slots_available > 0 THEN
    FOR v_waitlist_user IN 
      SELECT * FROM public.event_waitlist
      WHERE event_id = p_event_id AND status = 'waiting'
      ORDER BY position ASC
      LIMIT v_slots_available
    LOOP
      -- Add user from waitlist to participants
      INSERT INTO public.event_participants (
        event_id, user_id, status, notification_preference
      ) VALUES (
        p_event_id, v_waitlist_user.user_id, 'attending', 'all'
      );
      
      -- Update waitlist status
      UPDATE public.event_waitlist
      SET status = 'promoted', notification_sent = true
      WHERE id = v_waitlist_user.id;
      
      -- Create notification for the user
      INSERT INTO public.notifications (
        user_id, type, content, reference_id, reference_type
      ) VALUES (
        v_waitlist_user.user_id, 'event_waitlist_promoted', 
        'You have been moved from the waitlist to the attendee list for "' || v_event.title || '"', 
        p_event_id, 'event'
      );
      
      v_promoted_count := v_promoted_count + 1;
    END LOOP;
  END IF;
  
  RETURN v_promoted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to set reminders for an event
CREATE OR REPLACE FUNCTION public.set_event_reminder(
  p_event_id UUID,
  p_reminder_time TIMESTAMPTZ
)
RETURNS UUID AS $$
DECLARE
  v_user_id UUID;
  v_event public.events%ROWTYPE;
  v_reminder_id UUID;
BEGIN
  -- Get current user
  v_user_id := auth.uid();
  
  -- Get event details
  SELECT * INTO v_event FROM public.events WHERE id = p_event_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Event not found';
  END IF;
  
  -- Validate reminder time is before event start
  IF p_reminder_time >= v_event.start_date THEN
    RAISE EXCEPTION 'Reminder time must be before event start time';
  END IF;
  
  -- Validate reminder time is in the future
  IF p_reminder_time <= NOW() THEN
    RAISE EXCEPTION 'Reminder time must be in the future';
  END IF;
  
  -- Add or update reminder
  INSERT INTO public.event_reminders (
    event_id, user_id, reminder_time
  ) VALUES (
    p_event_id, v_user_id, p_reminder_time
  )
  ON CONFLICT (event_id, user_id, reminder_time)
  DO UPDATE SET sent = FALSE
  RETURNING id INTO v_reminder_id;
  
  RETURN v_reminder_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get upcoming reminders for processing
CREATE OR REPLACE FUNCTION public.get_due_event_reminders(p_limit INTEGER DEFAULT 100)
RETURNS SETOF public.event_reminders AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM public.event_reminders
  WHERE reminder_time <= NOW() + INTERVAL '5 minutes'
  AND sent = FALSE
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark reminders as sent
CREATE OR REPLACE FUNCTION public.mark_reminder_sent(p_reminder_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.event_reminders
  SET sent = TRUE
  WHERE id = p_reminder_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check event capacity
CREATE OR REPLACE FUNCTION public.check_event_capacity(p_event_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_event public.events%ROWTYPE;
  v_attending_count INTEGER;
  v_capacity INTEGER;
  v_waitlist_count INTEGER;
BEGIN
  -- Get event details
  SELECT * INTO v_event FROM public.events WHERE id = p_event_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'Event not found');
  END IF;
  
  -- Count attendees
  SELECT COUNT(*) INTO v_attending_count
  FROM public.event_participants
  WHERE event_id = p_event_id AND status = 'attending';
  
  -- Default capacity to unlimited if not set
  v_capacity := COALESCE(v_event.max_participants, -1);
  
  -- Count waitlist
  SELECT COUNT(*) INTO v_waitlist_count
  FROM public.event_waitlist
  WHERE event_id = p_event_id AND status = 'waiting';
  
  -- Return capacity info
  RETURN jsonb_build_object(
    'event_id', p_event_id,
    'title', v_event.title,
    'attending', v_attending_count,
    'capacity', v_capacity,
    'is_full', CASE WHEN v_capacity = -1 THEN false ELSE v_attending_count >= v_capacity END,
    'waitlist_count', v_waitlist_count,
    'available_slots', CASE WHEN v_capacity = -1 THEN -1 ELSE v_capacity - v_attending_count END
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================
-- 6. Add Triggers for RSVP Events
-- =====================================

-- Trigger function to notify on event time changes
CREATE OR REPLACE FUNCTION public.notify_event_time_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Only proceed if time has changed
  IF NEW.start_date <> OLD.start_date OR NEW.end_date <> OLD.end_date THEN
    -- Create notifications for all attending participants
    INSERT INTO public.notifications (
      user_id, actor_id, type, content, reference_id, reference_type
    )
    SELECT 
      ep.user_id, 
      NEW.user_id,
      'event_time_change',
      'The event "' || NEW.title || '" has had its time changed.',
      NEW.id,
      'event'
    FROM public.event_participants ep
    WHERE ep.event_id = NEW.id
    AND ep.status = 'attending'
    AND ep.notification_preference IN ('all', 'important');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS event_time_change_notifier ON public.events;
CREATE TRIGGER event_time_change_notifier
AFTER UPDATE OF start_date, end_date ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.notify_event_time_change();

-- Add event cancellation trigger
CREATE OR REPLACE FUNCTION public.notify_event_cancellation()
RETURNS TRIGGER AS $$
BEGIN
  -- Only proceed if status changed to cancelled
  IF NEW.status = 'cancelled' AND OLD.status <> 'cancelled' THEN
    -- Create notifications for all participants
    INSERT INTO public.notifications (
      user_id, actor_id, type, content, reference_id, reference_type
    )
    SELECT 
      ep.user_id, 
      NEW.user_id,
      'event_cancelled',
      'The event "' || NEW.title || '" has been cancelled.',
      NEW.id,
      'event'
    FROM public.event_participants ep
    WHERE ep.event_id = NEW.id;
    
    -- Also notify people on the waitlist
    INSERT INTO public.notifications (
      user_id, actor_id, type, content, reference_id, reference_type
    )
    SELECT 
      ew.user_id, 
      NEW.user_id,
      'event_cancelled',
      'The event "' || NEW.title || '" has been cancelled.',
      NEW.id,
      'event'
    FROM public.event_waitlist ew
    WHERE ew.event_id = NEW.id
    AND ew.status = 'waiting';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS event_cancellation_notifier ON public.events;
CREATE TRIGGER event_cancellation_notifier
AFTER UPDATE OF status ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.notify_event_cancellation();

-- =====================================
-- 7. Create Views for Event Analytics
-- =====================================

-- Create view for event statistics
CREATE OR REPLACE VIEW public.event_stats AS
SELECT 
  e.id AS event_id,
  e.title,
  e.user_id AS creator_id,
  e.start_date,
  e.end_date,
  e.status,
  e.max_participants,
  COUNT(DISTINCT CASE WHEN ep.status = 'attending' THEN ep.user_id END) AS attending_count,
  COUNT(DISTINCT CASE WHEN ep.status = 'maybe' THEN ep.user_id END) AS maybe_count,
  COUNT(DISTINCT CASE WHEN ep.status = 'declined' THEN ep.user_id END) AS declined_count,
  COUNT(DISTINCT ew.id) AS waitlist_count,
  CASE 
    WHEN e.max_participants IS NULL THEN false
    ELSE COUNT(DISTINCT CASE WHEN ep.status = 'attending' THEN ep.user_id END) >= e.max_participants
  END AS is_full
FROM 
  public.events e
LEFT JOIN 
  public.event_participants ep ON e.id = ep.event_id
LEFT JOIN 
  public.event_waitlist ew ON e.id = ew.event_id AND ew.status = 'waiting'
GROUP BY 
  e.id, e.title, e.user_id, e.start_date, e.end_date, e.status, e.max_participants;

-- Create view for user's events
CREATE OR REPLACE VIEW public.user_events AS
SELECT 
  e.id AS event_id,
  e.title,
  e.start_date,
  e.end_date,
  e.status,
  e.is_virtual,
  e.location,
  e.image_url,
  ep.user_id,
  ep.status AS rsvp_status,
  e.user_id = ep.user_id AS is_creator,
  CASE 
    WHEN e.max_participants IS NULL THEN false
    ELSE (
      SELECT COUNT(*) FROM public.event_participants 
      WHERE event_id = e.id AND status = 'attending'
    ) >= e.max_participants
  END AS is_full
FROM 
  public.events e
JOIN 
  public.event_participants ep ON e.id = ep.event_id;
