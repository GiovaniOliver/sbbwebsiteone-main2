import { db } from '../../lib/db';  
import { User, toUser, UserDb } from '../../lib/types/user';

interface CreateUserParams {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const { data: user, error } = await db
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !user) {
      return null;
    }

    return toUser(user);
  } catch (error) {
    console.error('Error getting user by id:', error);
    throw error;
  }
}

export async function createUser(data: CreateUserParams): Promise<User> {
  try {
    const { data: user, error } = await db
      .from('users')
      .insert({
        id: data.id,
        username: data.username,
        first_name: data.firstName,
        last_name: data.lastName,
        image_url: data.imageUrl || null
      })
      .select()
      .single();

    if (error || !user) {
      throw new Error('Failed to create user');
    }

    return toUser(user);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function updateUser(id: string, data: Partial<CreateUserParams>): Promise<User> {
  try {
    const updates: Record<string, any> = {};

    if (data.username) {
      updates.username = data.username;
    }
    if (data.firstName) {
      updates.first_name = data.firstName;
    }
    if (data.lastName) {
      updates.last_name = data.lastName;
    }
    if ('imageUrl' in data) {
      updates.image_url = data.imageUrl || null;
    }

    if (Object.keys(updates).length === 0) {
      const user = await getUserById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    }

    const { data: user, error } = await db
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error || !user) {
      throw new Error('Failed to update user');
    }

    return toUser(user);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    const { error } = await db
      .from('users')
      .delete()
      .eq('id', id);
    
    return !error;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
}

export async function getUsersByIds(ids: string[]): Promise<User[]> {
  if (ids.length === 0) return [];
  
  try {
    const { data: users, error } = await db
      .from('users')
      .select('*')
      .in('id', ids);

    if (error || !users) {
      return [];
    }

    return users.map(toUser);
  } catch (error) {
    console.error('Error getting users by ids:', error);
    return [];
  }
} 