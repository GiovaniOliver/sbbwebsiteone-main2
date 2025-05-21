-- ==============================
-- Consolidated Migration File (Part 5)
-- Messaging Infrastructure
-- ==============================

-- This file consolidates the following migration files:
-- * 20250311010003_messaging_infrastructure.sql

-- ==============================
-- Messaging Infrastructure (from 20250311010003_messaging_infrastructure.sql)
-- ==============================

-- =====================================
-- 1. Enhance Existing Messaging Tables
-- =====================================

-- Add message read status table
CREATE TABLE IF NOT EXISTS public.message_read_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  read_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(message_id, user_id)
);

-- Create indices
CREATE INDEX IF NOT EXISTS idx_message_read_status_message_id ON public.message_read_status(message_id);
CREATE INDEX IF NOT EXISTS idx_message_read_status_user_id ON public.message_read_status(user_id);
CREATE INDEX IF NOT EXISTS idx_message_read_status_read_at ON public.message_read_status(read_at DESC);

-- Enable RLS
ALTER TABLE public.message_read_status ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can view their own read status"
ON public.message_read_status FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can mark messages as read"
ON public.message_read_status FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Add message reactions
CREATE TABLE IF NOT EXISTS public.message_reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reaction TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(message_id, user_id, reaction)
);

-- Create indices
CREATE INDEX IF NOT EXISTS idx_message_reactions_message_id ON public.message_reactions(message_id);
CREATE INDEX IF NOT EXISTS idx_message_reactions_user_id ON public.message_reactions(user_id);
CREATE INDEX IF NOT EXISTS idx_message_reactions_reaction ON public.message_reactions(reaction);

-- Enable RLS
ALTER TABLE public.message_reactions ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can view message reactions"
ON public.message_reactions FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.conversation_members cm
    JOIN public.messages m ON m.conversation_id = cm.conversation_id
    WHERE m.id = message_id
    AND cm.user_id = auth.uid()
  )
);

CREATE POLICY "Users can add reactions to messages in their conversations"
ON public.message_reactions FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM public.conversation_members cm
    JOIN public.messages m ON m.conversation_id = cm.conversation_id
    WHERE m.id = message_id
    AND cm.user_id = auth.uid()
  )
);

CREATE POLICY "Users can remove their own reactions"
ON public.message_reactions FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Add message edit history
CREATE TABLE IF NOT EXISTS public.message_edits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE NOT NULL,
  previous_content TEXT NOT NULL,
  edit_reason TEXT,
  edited_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  edited_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indices
CREATE INDEX IF NOT EXISTS idx_message_edits_message_id ON public.message_edits(message_id);
CREATE INDEX IF NOT EXISTS idx_message_edits_edited_by ON public.message_edits(edited_by);
CREATE INDEX IF NOT EXISTS idx_message_edits_edited_at ON public.message_edits(edited_at DESC);

-- Enable RLS
ALTER TABLE public.message_edits ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can view edit history for messages in their conversations"
ON public.message_edits FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.conversation_members cm
    JOIN public.messages m ON m.conversation_id = cm.conversation_id
    WHERE m.id = message_id
    AND cm.user_id = auth.uid()
  )
);

CREATE POLICY "Message owners can create edit history"
ON public.message_edits FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.messages m
    WHERE m.id = message_id
    AND m.sender_id = auth.uid()
    AND edited_by = auth.uid()
  )
);

-- Update messages table
ALTER TABLE public.messages
ADD COLUMN IF NOT EXISTS edited BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS last_edited_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS has_attachments BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS has_reactions BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS reply_to_id UUID REFERENCES public.messages(id);

-- Create index for reply_to_id
CREATE INDEX IF NOT EXISTS idx_messages_reply_to_id ON public.messages(reply_to_id);

-- =====================================
-- 2. Message Attachments
-- =====================================

-- Create message attachments table
CREATE TABLE IF NOT EXISTS public.message_attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  thumbnail_path TEXT,
  uploaded_by UUID REFERENCES public.profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indices
CREATE INDEX IF NOT EXISTS idx_message_attachments_message_id ON public.message_attachments(message_id);
CREATE INDEX IF NOT EXISTS idx_message_attachments_uploaded_by ON public.message_attachments(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_message_attachments_file_type ON public.message_attachments(file_type);

-- Enable RLS
ALTER TABLE public.message_attachments ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can view attachments in their conversations"
ON public.message_attachments FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.conversation_members cm
    JOIN public.messages m ON m.conversation_id = cm.conversation_id
    WHERE m.id = message_id
    AND cm.user_id = auth.uid()
  )
);

CREATE POLICY "Users can upload attachments to their messages"
ON public.message_attachments FOR INSERT
TO authenticated
WITH CHECK (
  uploaded_by = auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.messages m
    WHERE m.id = message_id
    AND m.sender_id = auth.uid()
  )
);

CREATE POLICY "Users can delete their own attachments"
ON public.message_attachments FOR DELETE
TO authenticated
USING (uploaded_by = auth.uid());

-- =====================================
-- 3. Conversation Settings
-- =====================================

-- Add settings to conversation_members
ALTER TABLE public.conversation_members
ADD COLUMN IF NOT EXISTS muted BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS pinned BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS notification_level TEXT DEFAULT 'all',
ADD COLUMN IF NOT EXISTS last_read_message_id UUID REFERENCES public.messages(id);

-- Create index for last_read_message_id
CREATE INDEX IF NOT EXISTS idx_conversation_members_last_read_message_id ON public.conversation_members(last_read_message_id);

-- Create conversation preferences table for additional settings
CREATE TABLE IF NOT EXISTS public.conversation_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  custom_name TEXT,
  theme TEXT,
  custom_notification_sound TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(conversation_id, user_id)
);

-- Create indices
CREATE INDEX IF NOT EXISTS idx_conversation_preferences_conversation_id ON public.conversation_preferences(conversation_id);
CREATE INDEX IF NOT EXISTS idx_conversation_preferences_user_id ON public.conversation_preferences(user_id);

-- Enable RLS
ALTER TABLE public.conversation_preferences ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can view their own conversation preferences"
ON public.conversation_preferences FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversation preferences"
ON public.conversation_preferences FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversation preferences"
ON public.conversation_preferences FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add updated_at timestamp trigger
CREATE TRIGGER handle_conversation_preferences_updated_at
BEFORE UPDATE ON public.conversation_preferences
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- =====================================
-- 4. Message Management Functions
-- =====================================

-- Function to edit a message
CREATE OR REPLACE FUNCTION public.edit_message(
  p_message_id UUID,
  p_new_content TEXT,
  p_edit_reason TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  v_message RECORD;
  v_user_id UUID;
BEGIN
  -- Get the current user ID
  v_user_id := auth.uid();
  
  -- Check if the message exists and is owned by the current user
  SELECT * INTO v_message
  FROM public.messages
  WHERE id = p_message_id;
  
  IF v_message.id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Message not found'
    );
  END IF;
  
  IF v_message.sender_id != v_user_id THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'You can only edit your own messages'
    );
  END IF;
  
  -- Check if content is the same
  IF v_message.content = p_new_content THEN
    RETURN jsonb_build_object(
      'success', true,
      'message', 'No changes made to message content'
    );
  END IF;
  
  -- Save the edit history
  INSERT INTO public.message_edits (
    message_id,
    previous_content,
    edit_reason,
    edited_by
  )
  VALUES (
    p_message_id,
    v_message.content,
    p_edit_reason,
    v_user_id
  );
  
  -- Update the message
  UPDATE public.messages
  SET content = p_new_content,
      edited = TRUE,
      last_edited_at = NOW()
  WHERE id = p_message_id;
  
  -- Return success
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Message updated successfully',
    'edited_at', NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark messages as read
CREATE OR REPLACE FUNCTION public.mark_messages_read(
  p_conversation_id UUID,
  p_up_to_message_id UUID DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  v_user_id UUID;
  v_conversation RECORD;
  v_latest_message_id UUID;
  v_read_count INTEGER := 0;
BEGIN
  -- Get the current user ID
  v_user_id := auth.uid();
  
  -- Check if user is a member of the conversation
  SELECT * INTO v_conversation
  FROM public.conversation_members
  WHERE conversation_id = p_conversation_id
    AND user_id = v_user_id;
  
  IF v_conversation.id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'You are not a member of this conversation'
    );
  END IF;
  
  -- If no specific message ID is provided, get the latest message in the conversation
  IF p_up_to_message_id IS NULL THEN
    SELECT id INTO v_latest_message_id
    FROM public.messages
    WHERE conversation_id = p_conversation_id
    ORDER BY created_at DESC
    LIMIT 1;
  ELSE
    -- Verify the message exists in the conversation
    SELECT id INTO v_latest_message_id
    FROM public.messages
    WHERE id = p_up_to_message_id
      AND conversation_id = p_conversation_id;
      
    IF v_latest_message_id IS NULL THEN
      RETURN jsonb_build_object(
        'success', false,
        'message', 'Message not found in this conversation'
      );
    END IF;
  END IF;
  
  -- If no messages to read
  IF v_latest_message_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', true,
      'message', 'No messages to mark as read',
      'count', 0
    );
  END IF;
  
  -- Update the last read message ID for the user
  UPDATE public.conversation_members
  SET last_read_message_id = v_latest_message_id,
      updated_at = NOW()
  WHERE id = v_conversation.id;
  
  -- Mark all unread messages as read
  WITH unread_messages AS (
    SELECT m.id
    FROM public.messages m
    LEFT JOIN public.message_read_status mrs
      ON m.id = mrs.message_id AND mrs.user_id = v_user_id
    WHERE m.conversation_id = p_conversation_id
      AND m.created_at <= (
        SELECT created_at FROM public.messages WHERE id = v_latest_message_id
      )
      AND m.sender_id != v_user_id  -- Skip messages sent by the current user
      AND mrs.id IS NULL  -- Only messages not already marked as read
  ),
  inserted AS (
    INSERT INTO public.message_read_status (
      message_id,
      user_id
    )
    SELECT id, v_user_id
    FROM unread_messages
    RETURNING 1
  )
  SELECT COUNT(*) INTO v_read_count
  FROM inserted;
  
  -- Return success
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Messages marked as read',
    'count', v_read_count,
    'last_read_message_id', v_latest_message_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to add a reaction to a message
CREATE OR REPLACE FUNCTION public.add_message_reaction(
  p_message_id UUID,
  p_reaction TEXT
)
RETURNS JSONB AS $$
DECLARE
  v_user_id UUID;
  v_message RECORD;
BEGIN
  -- Get the current user ID
  v_user_id := auth.uid();
  
  -- Check if the message exists and the user has access to it
  SELECT m.* INTO v_message
  FROM public.messages m
  JOIN public.conversation_members cm
    ON m.conversation_id = cm.conversation_id
  WHERE m.id = p_message_id
    AND cm.user_id = v_user_id;
  
  IF v_message.id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Message not found or you do not have access to it'
    );
  END IF;
  
  -- Add the reaction
  INSERT INTO public.message_reactions (
    message_id,
    user_id,
    reaction
  )
  VALUES (
    p_message_id,
    v_user_id,
    p_reaction
  )
  ON CONFLICT (message_id, user_id, reaction) DO NOTHING;
  
  -- Update the has_reactions flag on the message
  UPDATE public.messages
  SET has_reactions = TRUE
  WHERE id = p_message_id
    AND has_reactions = FALSE;
  
  -- Return success
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Reaction added',
    'reaction', p_reaction
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to remove a reaction from a message
CREATE OR REPLACE FUNCTION public.remove_message_reaction(
  p_message_id UUID,
  p_reaction TEXT
)
RETURNS JSONB AS $$
DECLARE
  v_user_id UUID;
  v_deleted BOOLEAN;
  v_has_other_reactions BOOLEAN;
BEGIN
  -- Get the current user ID
  v_user_id := auth.uid();
  
  -- Delete the reaction
  DELETE FROM public.message_reactions
  WHERE message_id = p_message_id
    AND user_id = v_user_id
    AND reaction = p_reaction;
  
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  
  -- Check if there are any remaining reactions for this message
  SELECT EXISTS (
    SELECT 1 FROM public.message_reactions
    WHERE message_id = p_message_id
  ) INTO v_has_other_reactions;
  
  -- Update the has_reactions flag if needed
  IF NOT v_has_other_reactions THEN
    UPDATE public.messages
    SET has_reactions = FALSE
    WHERE id = p_message_id;
  END IF;
  
  -- Return success
  RETURN jsonb_build_object(
    'success', v_deleted,
    'message', CASE WHEN v_deleted THEN 'Reaction removed' ELSE 'Reaction not found' END
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================
-- 5. Notification Handlers
-- =====================================

-- Function to handle new message notifications
CREATE OR REPLACE FUNCTION public.handle_new_message()
RETURNS TRIGGER AS $$
DECLARE
  r RECORD;
  v_conversation_title TEXT;
  v_sender_username TEXT;
BEGIN
  -- Get the conversation title
  SELECT title INTO v_conversation_title
  FROM public.conversations
  WHERE id = NEW.conversation_id;
  
  -- Get the sender username
  SELECT username INTO v_sender_username
  FROM public.profiles
  WHERE id = NEW.sender_id;
  
  -- Automatically mark message as read for sender
  INSERT INTO public.message_read_status (
    message_id,
    user_id
  )
  VALUES (
    NEW.id,
    NEW.sender_id
  );
  
  -- Update the conversation members' last activity timestamp
  UPDATE public.conversation_members
  SET updated_at = NOW()
  WHERE conversation_id = NEW.conversation_id;
  
  -- Update the sender's last read message
  UPDATE public.conversation_members
  SET last_read_message_id = NEW.id
  WHERE conversation_id = NEW.conversation_id
    AND user_id = NEW.sender_id;
  
  -- Send notifications to all other members of the conversation
  FOR r IN
    SELECT cm.user_id, cm.notification_level, cm.muted
    FROM public.conversation_members cm
    WHERE cm.conversation_id = NEW.conversation_id
      AND cm.user_id != NEW.sender_id
      AND cm.muted = FALSE  -- Don't notify muted conversations
  LOOP
    -- Only send notification based on the user's notification level
    IF r.notification_level = 'all' OR 
       (r.notification_level = 'mentions' AND NEW.content LIKE '%@' || r.user_id || '%') THEN
      
      -- Create notification
      INSERT INTO public.notifications (
        user_id,
        type,
        content,
        reference_id,
        reference_table
      )
      VALUES (
        r.user_id,
        'new_message',
        format('New message from %s in %s', 
               v_sender_username, 
               COALESCE(v_conversation_title, 'conversation')),
        NEW.id,
        'messages'
      );
    END IF;
  END LOOP;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new message notifications
DROP TRIGGER IF EXISTS message_notification_trigger ON public.messages;
CREATE TRIGGER message_notification_trigger
AFTER INSERT ON public.messages
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_message();

-- =====================================
-- 6. Messaging Views
-- =====================================

-- Create a view for unread messages count
CREATE OR REPLACE VIEW public.unread_messages_count AS
WITH last_read AS (
  SELECT 
    cm.user_id,
    cm.conversation_id,
    COALESCE(
      (SELECT created_at FROM public.messages WHERE id = cm.last_read_message_id),
      '1970-01-01'::TIMESTAMPTZ
    ) AS last_read_time
  FROM 
    public.conversation_members cm
),
unread_counts AS (
  SELECT 
    lr.user_id,
    lr.conversation_id,
    COUNT(m.id) AS unread_count
  FROM 
    last_read lr
  JOIN 
    public.messages m ON m.conversation_id = lr.conversation_id
  LEFT JOIN
    public.message_read_status mrs ON m.id = mrs.message_id AND mrs.user_id = lr.user_id
  WHERE 
    (m.created_at > lr.last_read_time OR lr.last_read_time IS NULL)
    AND m.sender_id != lr.user_id
    AND mrs.id IS NULL
  GROUP BY 
    lr.user_id, lr.conversation_id
)
SELECT 
  uc.user_id,
  uc.conversation_id,
  c.title AS conversation_title,
  c.type AS conversation_type,
  uc.unread_count,
  (
    SELECT MAX(created_at) 
    FROM public.messages 
    WHERE conversation_id = uc.conversation_id
  ) AS last_activity
FROM 
  unread_counts uc
JOIN 
  public.conversations c ON c.id = uc.conversation_id;

-- Create a view for conversation summaries
CREATE OR REPLACE VIEW public.conversation_summaries AS
WITH last_messages AS (
  SELECT 
    conversation_id,
    id AS message_id,
    sender_id,
    content,
    created_at,
    has_attachments,
    ROW_NUMBER() OVER (PARTITION BY conversation_id ORDER BY created_at DESC) AS rn
  FROM 
    public.messages
)
SELECT 
  c.id AS conversation_id,
  c.title AS conversation_title,
  c.type AS conversation_type,
  c.created_at AS conversation_created_at,
  lm.message_id AS last_message_id,
  lm.sender_id AS last_message_sender_id,
  p.username AS last_message_sender_name,
  p.avatar_url AS last_message_sender_avatar,
  lm.content AS last_message_content,
  lm.created_at AS last_message_time,
  lm.has_attachments AS last_message_has_attachments,
  (
    SELECT COUNT(*) 
    FROM public.conversation_members 
    WHERE conversation_id = c.id
  ) AS member_count
FROM 
  public.conversations c
LEFT JOIN 
  last_messages lm ON c.id = lm.conversation_id AND lm.rn = 1
LEFT JOIN
  public.profiles p ON lm.sender_id = p.id
ORDER BY 
  lm.created_at DESC NULLS LAST; 