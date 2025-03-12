import { UserDb, User, toUser } from './user';

export type VerificationStatus = 'pending' | 'verified' | 'failed';
export type VerificationStrategy = 'email' | 'oauth' | 'manual';

export interface EmailAddressDb {
  id: string;
  user_id: string | null;
  email_address: string;
  is_primary: boolean;
  verification_status: VerificationStatus | null;
  verification_strategy: VerificationStrategy | null;
  created_at: Date;
  updated_at: Date;
}

export interface EmailAddress {
  id: string;
  userId: string | null;
  emailAddress: string;
  isPrimary: boolean;
  verificationStatus: VerificationStatus | null;
  verificationStrategy: VerificationStrategy | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailAddressDbWithRelations extends EmailAddressDb {
  user: UserDb;
}

export interface EmailAddressWithRelations extends EmailAddress {
  user: User;
}

export function toEmailAddress(db: EmailAddressDb): EmailAddress {
  return {
    id: db.id,
    userId: db.user_id,
    emailAddress: db.email_address,
    isPrimary: db.is_primary,
    verificationStatus: db.verification_status,
    verificationStrategy: db.verification_strategy,
    createdAt: db.created_at,
    updatedAt: db.updated_at
  };
}

export function toEmailAddressWithRelations(db: EmailAddressDbWithRelations): EmailAddressWithRelations {
  return {
    ...toEmailAddress(db),
    user: toUser(db.user)
  };
} 