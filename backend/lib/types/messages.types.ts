export interface ConversationDb {
  id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
  last_message_at: string | null;
  created_by: string;
}

export interface ConversationDto {
  id: string;
  title: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date | null;
  createdBy: string;
}

export interface ConversationParticipantDb {
  id: string;
  conversation_id: string;
  user_id: string;
  joined_at: string;
  last_read_at: string | null;
}

export interface ConversationParticipantDto {
  id: string;
  conversationId: string;
  userId: string;
  joinedAt: Date;
  lastReadAt: Date | null;
}

export interface MessageDb {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  reply_to: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface MessageDto {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  replyTo: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface MessageReactionDb {
  id: string;
  message_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
}

export interface MessageReactionDto {
  id: string;
  messageId: string;
  userId: string;
  emoji: string;
  createdAt: Date;
}

export interface MessageAttachmentDb {
  id: string;
  message_id: string;
  file_url: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

export interface MessageAttachmentDto {
  id: string;
  messageId: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  createdAt: Date;
}

export function toMessageDto(db: MessageDb): MessageDto {
  return {
    id: db.id,
    conversationId: db.conversation_id,
    senderId: db.sender_id,
    content: db.content,
    replyTo: db.reply_to,
    createdAt: new Date(db.created_at),
    updatedAt: new Date(db.updated_at),
    deletedAt: db.deleted_at ? new Date(db.deleted_at) : null
  };
}