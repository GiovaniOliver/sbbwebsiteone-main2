'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { logDebug, logError, logInfo } from "@/lib/logger";
import { useSupabase } from './useSupabase';

interface UseSupabaseStorageOptions {
  bucketName: string
  autoCreateBucket?: boolean
}

interface UploadOptions {
  folder?: string
  customName?: string
}

interface UploadResult {
  data: any
  publicUrl: string
}

export const useSupabaseStorage = ({ 
  bucketName, 
  autoCreateBucket = true 
}: UseSupabaseStorageOptions) => {
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { supabase } = useSupabase(); // Use our centralized Supabase client

  // Create bucket function that can be called directly
  const initializeBucket = async (): Promise<boolean> => {
    if (!supabase) {
      logError('useSupabaseStorage', 'Supabase client not initialized');
      return false;
    }

    try {
      logDebug('useSupabaseStorage', `Attempting to initialize bucket: ${bucketName}`);
      
      // First, check if the bucket exists
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      
      if (listError) {
        logError('useSupabaseStorage', 'Error listing buckets:', listError);
        setError(new Error(listError.message));
        return false;
      }
      
      const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
      
      if (bucketExists) {
        logInfo('useSupabaseStorage', `Bucket ${bucketName} already exists`);
        setIsReady(true);
        setError(null);
        return true;
      }
      
      // Create the bucket if it doesn't exist
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 10 * 1024 * 1024, // 10MB
        allowedMimeTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
          'video/mp4',
          'video/webm'
        ]
      });
      
      if (createError) {
        logError('useSupabaseStorage', `Error creating bucket ${bucketName}:`, createError);
        setError(new Error(createError.message));
        return false;
      }
      
      logInfo('useSupabaseStorage', `Successfully created bucket: ${bucketName}`);
      setIsReady(true);
      setError(null);
      return true;
    } catch (err) {
      logError('useSupabaseStorage', 'Error in initializeBucket:', err);
      setError(err instanceof Error ? err : new Error('Failed to initialize storage bucket'));
      return false;
    }
  };

  // Check if bucket exists and create it if it doesn't
  useEffect(() => {
    if (!supabase) return;

    const checkAndCreateBucket = async () => {
      try {
        await initializeBucket();
      } catch (err) {
        logError('useSupabaseStorage', 'Storage bucket error:', err);
        setError(err instanceof Error ? err : new Error('Unknown storage error'));
      }
    }

    if (autoCreateBucket) {
      checkAndCreateBucket();
    }
  }, [bucketName, autoCreateBucket, supabase]);

  // Helper function to upload a file
  const uploadFile = async (
    userId: string, 
    file: File, 
    options?: UploadOptions
  ): Promise<UploadResult> => {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }

    // If storage is not ready yet, try to initialize the bucket directly
    if (!isReady) {
      logInfo('useSupabaseStorage', 'Storage not ready yet, attempting direct initialization');
      const initialized = await initializeBucket();
      
      if (!initialized) {
        logError('useSupabaseStorage', 'Direct initialization failed');
        throw new Error('Failed to initialize storage bucket');
      }
    }

    const { folder = '', customName } = options || {}

    // Generate a safe file name
    const fileExt = file.name.split('.').pop()
    const fileName = customName || `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
    const filePath = folder
      ? `${userId}/${folder}/${fileName}.${fileExt}`
      : `${userId}/${fileName}.${fileExt}`

    try {
      logDebug('useSupabaseStorage', `Uploading file: ${filePath}`);
      
      // Upload the file
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type
        })

      if (error) {
        logError('useSupabaseStorage', 'Upload error:', error);
        throw error;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath)

      logInfo('useSupabaseStorage', `File uploaded successfully: ${filePath}`);
      
      return { data, publicUrl }
    } catch (err) {
      logError('useSupabaseStorage', 'File upload failed:', err);
      throw err instanceof Error ? err : new Error('File upload failed');
    }
  }

  const deleteFile = async (filePath: string): Promise<void> => {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }

    try {
      logDebug('useSupabaseStorage', `Deleting file: ${filePath}`);
      
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

      if (error) {
        logError('useSupabaseStorage', 'Delete error:', error);
        throw error;
      }

      logInfo('useSupabaseStorage', `File deleted successfully: ${filePath}`);
    } catch (err) {
      logError('useSupabaseStorage', 'File deletion failed:', err);
      throw err instanceof Error ? err : new Error('File deletion failed');
    }
  }

  return {
    isReady,
    error,
    uploadFile,
    deleteFile,
    initializeBucket,
    storage: supabase?.storage.from(bucketName)
  }
}

export default useSupabaseStorage 