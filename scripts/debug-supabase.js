// debug-supabase.js
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

async function main() {
  console.log('🔍 Supabase Debug Script 🔍');
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
  
  // Check tables
  console.log('Checking table structure...');
  
  // 1. Check Profiles table
  const { data: profilesData, error: profilesError } = await supabase
    .from('profiles')
    .select('*')
    .limit(1);
    
  if (profilesError) {
    console.error('❌ Profiles table error:', profilesError.message);
  } else {
    console.log('✅ Profiles table exists and accessible');
    console.log(`   Sample fields: ${Object.keys(profilesData[0] || {}).join(', ')}`);
  }
  
  // 2. Check Posts table
  const { data: postsData, error: postsError } = await supabase
    .from('posts')
    .select('*')
    .limit(1);
    
  if (postsError) {
    console.error('❌ Posts table error:', postsError.message);
  } else {
    console.log('✅ Posts table exists and accessible');
    console.log(`   Sample fields: ${Object.keys(postsData[0] || {}).join(', ')}`);
  }
  
  // Test the posts relationships query
  console.log('--------------------------');
  console.log('Testing posts query with relationships...');
  const { data: postWithRelations, error: relationError } = await supabase
    .from('posts')
    .select(`
      *,
      users:author_id (id, username, first_name, last_name, avatar_url),
      likes:post_likes (id, user_id),
      comments:post_comments (count)
    `)
    .limit(1);
  
  if (relationError) {
    console.error('❌ Relationship query failed:', relationError.message);
    console.log('Trying to debug the relationship issue...');
    
    // Check specific relationships
    const { data: authorCheck, error: authorError } = await supabase
      .from('posts')
      .select('author_id, id')
      .limit(1);
      
    if (authorError) {
      console.error('  ❌ Could not access author_id field:', authorError.message);
    } else {
      console.log('  ✅ author_id field exists in posts table:', authorCheck);
      
      // Check if the profile actually exists
      if (authorCheck && authorCheck.length > 0) {
        const authorId = authorCheck[0].author_id;
        const { data: authorData, error: authorLookupError } = await supabase
          .from('profiles')
          .select('id, username')
          .eq('id', authorId)
          .limit(1);
          
        if (authorLookupError) {
          console.error(`  ❌ Could not find profile with ID ${authorId}:`, authorLookupError.message);
        } else if (!authorData || authorData.length === 0) {
          console.error(`  ❌ Profile with ID ${authorId} does not exist in profiles table`);
        } else {
          console.log(`  ✅ Found matching profile for author_id ${authorId}:`, authorData);
        }
      }
    }
  } else {
    console.log('✅ Relationship query succeeded!');
    console.log('Sample post with relations:', JSON.stringify(postWithRelations[0], null, 2));
  }
  
  // Insert test data if no posts are found
  if (!postsData || postsData.length === 0) {
    console.log('--------------------------');
    console.log('No posts found. Would you like to insert test data? (Y/n)');
    
    process.stdout.write('> ');
    
    // Simple synchronous input for script simplicity
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    readline.question('> ', async (answer) => {
      if (answer.toLowerCase() === 'y' || answer === '') {
        console.log('Inserting test data...');
        
        // Check if we have profiles first
        const { data: existingProfiles } = await supabase
          .from('profiles')
          .select('id')
          .limit(1);
          
        if (!existingProfiles || existingProfiles.length === 0) {
          console.log('No profiles found. Cannot insert posts without profiles.');
          console.log('Please create a user account first.');
          readline.close();
          return;
        }
        
        const profileId = existingProfiles[0].id;
        
        // Insert a test post
        const { data: newPost, error: insertError } = await supabase
          .from('posts')
          .insert({
            author_id: profileId,
            content: 'This is a test post created by the debug script.',
            type: 'text',
            images: [],
            visibility: 'public'
          })
          .select();
          
        if (insertError) {
          console.error('❌ Failed to insert test post:', insertError.message);
        } else {
          console.log('✅ Test post inserted successfully:', newPost);
        }
      }
      
      readline.close();
    });
  }
}

main().catch(err => {
  console.error('Unhandled error in debug script:', err);
});
