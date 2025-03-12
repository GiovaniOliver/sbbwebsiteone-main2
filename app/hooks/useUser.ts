"use client";

import { useEffect, useState } from 'react';
import { ensureUserExists, signOut, updatePassword as updatePasswordService } from '@/backend/services/auth/auth.service';
import { User } from '@/backend/lib/types/user'; 

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await ensureUserExists();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateStatus = async (newStatus: string) => {
    if (!user) return;
    // Implement the logic to update the user's status in the backend
    // This might involve calling an API endpoint to update the status in the database
    // For example:
    // await updateUserStatus(user.id, newStatus);
    setUser((prevUser) => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, status: newStatus } as User & { status: string };
      return updatedUser;
    });
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return {
    user,
    isLoading,
    updateStatus,
    handleSignOut,
  };
}
