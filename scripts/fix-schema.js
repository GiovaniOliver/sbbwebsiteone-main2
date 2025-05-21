require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Supabase URL or Anon Key is missing in environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fixSchema() {
  console.log('🔨 Schema Fix Script 🔨');
  console.log('--------------------------');
  
  // Check connection
  console.log('Checking Supabase connection...');
  const { data: connectionTest, error: connectionError } = await supabase.from('profiles').select('count').limit(1);
  
  if (connectionError) {
    console.error('❌ Connection failed:', connectionError.message);
    return;
  }
  
  console.log('✅ Connected to Supabase successfully!');
  console.log('--------------------------');
  
  // Check if post_likes has wrong structure (with id column)
  console.log('Checking post_likes structure...');
  try {
    const { data: postLikesStructure, error: structureError } = await supabase.rpc('execute_sql', {
      sql: `
        SELECT column_name FROM information_schema.columns 
        WHERE table_name = 'post_likes' AND column_name = 'id';
      `
    });
    
    if (structureError) {
      console.error('❌ Could not check post_likes structure:', structureError.message);
    } else if (postLikesStructure && postLikesStructure.length > 0) {
      console.log('⚠️ post_likes table has incorrect structure with id column');
      console.log('Fixing post_likes table structure...');
      
      // Recreate the table with correct structure
      const { error: dropTableError } = await supabase.rpc('execute_sql', {
        sql: `
          DROP TABLE IF EXISTS public.post_likes;
          
          CREATE TABLE public.post_likes (
            post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
            user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
            created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
            PRIMARY KEY (post_id, user_id)
          );
        `
      });
      
      if (dropTableError) {
        console.error('❌ Failed to fix post_likes table:', dropTableError.message);
      } else {
        console.log('✅ Fixed post_likes table structure successfully');
      }
    } else {
      console.log('✅ post_likes table has correct structure (no id column)');
    }
  } catch (err) {
    console.error('❌ Error checking post_likes structure:', err.message);
  }
  
  // 1. Check if posts table exists
  const { data: postsCheck, error: postsCheckError } = await supabase
    .from('posts')
    .select('*')
    .limit(1);
    
  if (postsCheckError) {
    console.error('❌ Posts table error:', postsCheckError.message);
    console.log('Creating posts table...');
    
    // If table doesn't exist, try to create it based on the schema
    const { error: createTableError } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.posts (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
          content TEXT NOT NULL,
          images TEXT[] DEFAULT '{}',
          likes_count INTEGER DEFAULT 0,
          comments_count INTEGER DEFAULT 0,
          type TEXT DEFAULT 'standard',
          status TEXT DEFAULT 'published',
          visibility TEXT DEFAULT 'public',
          created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
        );
      `
    });
    
    if (createTableError) {
      console.error('❌ Failed to create posts table:', createTableError.message);
    } else {
      console.log('✅ Created posts table successfully');
    }
  } else {
    console.log('✅ Posts table exists');
  }
  
  // 2. Check if post_likes table exists
  const { data: likesCheck, error: likesCheckError } = await supabase
    .from('post_likes')
    .select('*')
    .limit(1);
    
  if (likesCheckError) {
    console.error('❌ post_likes table error:', likesCheckError.message);
    console.log('Creating post_likes table...');
    
    const { error: createLikesError } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.post_likes (
          post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
          user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
          created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
          PRIMARY KEY (post_id, user_id)
        );
      `
    });
    
    if (createLikesError) {
      console.error('❌ Failed to create post_likes table:', createLikesError.message);
    } else {
      console.log('✅ Created post_likes table successfully');
    }
  } else {
    console.log('✅ post_likes table exists');
  }
  
  // 3. Check if post_comments table exists
  const { data: commentsCheck, error: commentsCheckError } = await supabase
    .from('post_comments')
    .select('*')
    .limit(1);
    
  if (commentsCheckError) {
    console.error('❌ post_comments table error:', commentsCheckError.message);
    console.log('Creating post_comments table...');
    
    const { error: createCommentsError } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.post_comments (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
          user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
        );
      `
    });
    
    if (createCommentsError) {
      console.error('❌ Failed to create post_comments table:', createCommentsError.message);
    } else {
      console.log('✅ Created post_comments table successfully');
    }
  } else {
    console.log('✅ post_comments table exists');
  }
  
  // Create a test profile if none exists
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id')
    .limit(1);
  
  if (profilesError) {
    console.error('❌ Failed to check profiles:', profilesError.message);
  } else if (!profiles || profiles.length === 0) {
    console.log('No profiles found. Creating a test profile...');
    
    // Create a test user
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email: 'test@example.com',
      password: 'password123',
      options: {
        data: {
          username: 'testuser',
          full_name: 'Test User'
        }
      }
    });
    
    if (authError) {
      console.error('❌ Failed to create test user:', authError.message);
    } else {
      console.log('✅ Created test user:', authUser);
    }
  } else {
    console.log('✅ Profiles exist in database');
  }
  
  // Create a test post if none exists
  const { data: postsExist, error: postsExistError } = await supabase
    .from('posts')
    .select('id')
    .limit(1);
  
  if (postsExistError) {
    console.error('❌ Failed to check posts:', postsExistError.message);
  } else if (!postsExist || postsExist.length === 0) {
    console.log('No posts found. Creating a test post...');
    
    // Get a user ID to use for the post
    const { data: userProfile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (profileError || !userProfile || userProfile.length === 0) {
      console.error('❌ Failed to get user for test post:', profileError?.message || 'No users found');
    } else {
      const userId = userProfile[0].id;
      
      // Create a test post
      const { data: newPost, error: postError } = await supabase
        .from('posts')
        .insert({
          author_id: userId,
          content: 'This is a test post created by the fix-schema script',
          images: [],
          type: 'standard',
          status: 'published',
          visibility: 'public'
        })
        .select();
      
      if (postError) {
        console.error('❌ Failed to create test post:', postError.message);
      } else {
        console.log('✅ Created test post:', newPost);
      }
    }
  } else {
    console.log('✅ Posts exist in database');
  }
  
  console.log('--------------------------');
  console.log('Schema check and fixes completed!');
}

fixSchema().catch(err => {
  console.error('Unhandled error in fix schema script:', err);
});
