-- Enable RLS on storage.objects table (not on buckets directly)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to insert their own files with path pattern matching
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  -- Only allow uploads to paths that start with the user's ID
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow users to update their own files
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow users to delete their own files
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow authenticated users to read from any path in the avatars bucket
CREATE POLICY "Authenticated users can read any avatar"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'avatars'
);

-- Add public read access for avatars if needed
CREATE POLICY "Public users can read avatars"
ON storage.objects FOR SELECT TO anon
USING (
  bucket_id = 'avatars'
);

-- Add policies for post-media bucket
CREATE POLICY "Users can upload their own post media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'post-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own post media"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'post-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own post media"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'post-media' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Authenticated users can read any post media"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'post-media'
);

CREATE POLICY "Public users can read post media"
ON storage.objects FOR SELECT TO anon
USING (
  bucket_id = 'post-media'
);

-- Allow authenticated users to access the bucket
CREATE POLICY "Allow users to use post-media bucket"
ON storage.buckets
FOR ALL
TO authenticated
USING (name = 'post-media');

-- Create the post-media bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('post-media', 'post-media', true)
ON CONFLICT (id) DO NOTHING; 