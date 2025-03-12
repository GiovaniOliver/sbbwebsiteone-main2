// backend/lib/db-utils.ts

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { UserDb } from './types/user';
import { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './types/supabase';

// Error handling utility
function handleDatabaseError(error: PostgrestError | null, context: string): null {
  if (!error) return null;
  
  // Handle specific PostgREST errors
  if (error.code === 'PGRST116') {
    console.error(`${context}: No results found or multiple results returned when expecting a single row`);
    return null;
  }

  console.error(`${context}:`, error.message, error.code);
  return null;
}

export async function getUser(userId: string): Promise<UserDb | null> {
  const supabase = createClientComponentClient<Database>();
  
  try {
    // Check session first
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.error('No active session');
      return null;
    }

    // Fetch user data with maybeSingle() instead of single()
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      return handleDatabaseError(error, 'Error fetching user');
    }

    return user;
  } catch (error: any) {
    console.error('Unexpected error:', error?.message || error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<UserDb | null> {
  const supabase = createClientComponentClient<Database>();
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      return handleDatabaseError(error, 'Error fetching user by email');
    }

    return data;
  } catch (error: any) {
    console.error('Unexpected error:', error?.message || error);
    return null;
  }
}

export async function getUserByUsername(username: string): Promise<UserDb | null> {
  const supabase = createClientComponentClient<Database>();
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .maybeSingle();

    if (error) {
      return handleDatabaseError(error, 'Error fetching user by username');
    }

    return data;
  } catch (error: any) {
    console.error('Unexpected error:', error?.message || error);
    return null;
  }
}

export async function createUser(user: Omit<UserDb, 'id' | 'created_at' | 'updated_at'>): Promise<UserDb | null> {
  const supabase = createClientComponentClient<Database>();
  try {
    // First check if user with same email or username exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .or('email.eq.' + user.email + ',username.eq.' + user.username)
      .maybeSingle();

    if (checkError) {
      return handleDatabaseError(checkError, 'Error checking existing user');
    }

    if (existingUser) {
      console.error('User with this email or username already exists');
      return null;
    }

    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select()
      .single();

    if (error) {
      return handleDatabaseError(error, 'Error creating user');
    }

    return data;
  } catch (error: any) {
    console.error('Unexpected error:', error?.message || error);
    return null;
  }
}

export async function updateUser(userId: string, updates: Partial<UserDb>): Promise<UserDb | null> {
  const supabase = createClientComponentClient<Database>();
  try {
    // If updating email or username, check for conflicts
    if (updates.email || updates.username) {
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('*')
        .or('email.eq.' + updates.email + ',username.eq.' + updates.username)
        .not('id', 'eq', userId)
        .maybeSingle();

      if (checkError) {
        return handleDatabaseError(checkError, 'Error checking existing user');
      }

      if (existingUser) {
        console.error('User with this email or username already exists');
        return null;
      }
    }

    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .maybeSingle();

    if (error) {
      return handleDatabaseError(error, 'Error updating user');
    }

    return data;
  } catch (error: any) {
    console.error('Unexpected error:', error?.message || error);
    return null;
  }
}

export async function deleteUser(userId: string): Promise<boolean> {
  const supabase = createClientComponentClient<Database>();
  try {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) {
      handleDatabaseError(error, 'Error deleting user');
      return false;
    }

    return true;
  } catch (error: any) {
    console.error('Unexpected error:', error?.message || error);
    return false;
  }
}
