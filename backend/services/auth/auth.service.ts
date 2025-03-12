import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getUserByEmail, createUser, getUser } from '../../lib/db-utils';
import { User, toUser } from '../../lib/types/user';
import bcrypt from 'bcryptjs';

export async function ensureUserExists(): Promise<User> {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !session) {
    throw new Error('Unauthorized');
  }

  const user = await getUser(session.user.id);
  if (!user) {
    throw new Error('User not found');
  }

  return toUser(user);
}

export async function signUp(email: string, password: string, username: string): Promise<User | null> {
  const supabase = createRouteHandlerClient({ cookies });
  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      throw authError;
    }

    // Create user in our database
    const newUser = await createUser({
      username,
      email,
      password_hash: hashedPassword,
      two_factor_enabled: false,
      banned: false,
      locked: false,
      first_name: null,
      last_name: null,
      image_url: null,
      profile_image_url: null,
      last_sign_in_at: null,
      metadata: {}
    });

    return newUser ? toUser(newUser) : null;
  } catch (error) {
    console.error('Error in signUp:', error);
    return null;
  }
}

export async function signIn(email: string, password: string): Promise<User | null> {
  const supabase = createRouteHandlerClient({ cookies });
  try {
    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      throw authError;
    }

    // Get user from our database
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    return toUser(user);
  } catch (error) {
    console.error('Error in signIn:', error);
    return null;
  }
}

export async function signOut(): Promise<void> {
  const supabase = createRouteHandlerClient({ cookies });
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error in signOut:', error);
  }
}

export async function resetPassword(email: string): Promise<boolean> {
  const supabase = createRouteHandlerClient({ cookies });
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error('Error in resetPassword:', error);
    return false;
  }
}

export async function updatePassword(newPassword: string): Promise<boolean> {
  const supabase = createRouteHandlerClient({ cookies });
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error('Error in updatePassword:', error);
    return false;
  }
} 