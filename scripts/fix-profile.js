// fix-profile.js - Script to diagnose and fix profile data issues
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const readline = require('readline');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Supabase URL or Anon Key is missing in environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Utility to prompt for input
const prompt = (question) => new Promise((resolve) => rl.question(question, resolve));

async function main() {
  console.log('🔍 Profile Diagnostic Tool 🔧');
  console.log('---------------------------------');
  
  // Check if user is authenticated
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError) {
    console.error('❌ Session error:', sessionError.message);
    rl.close();
    return;
  }
  
  if (!session) {
    console.log('❌ No authenticated session.');
    console.log('Please authenticate first by running:');
    console.log('  npx supabase login');
    rl.close();
    return;
  }
  
  const userId = session.user.id;
  console.log(`✅ Authenticated as user ID: ${userId}`);
  
  // Ask for specific user ID or use current user
  const checkSelf = await prompt('Check your own profile or another user? (me/other): ');
  let targetUserId = userId;
  
  if (checkSelf.toLowerCase() === 'other') {
    targetUserId = await prompt('Enter user ID to check: ');
  }
  
  // Fetch profile
  console.log(`\nChecking profile for user ID: ${targetUserId}`);
  
  try {
    // Try to get profile with relationships
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(`
        *,
        followers:follows!follows_following_id_fkey(count),
        following:follows!follows_follower_id_fkey(count)
      `)
      .eq('id', targetUserId)
      .maybeSingle();
    
    if (profileError) {
      console.error('❌ Error fetching profile with relationships:', profileError.message);
      
      // Try to get basic profile
      console.log('Checking for basic profile without relationships...');
      const { data: basicProfile, error: basicError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetUserId)
        .maybeSingle();
      
      if (basicError) {
        console.error('❌ Error fetching basic profile:', basicError.message);
        throw new Error('Cannot access profile data');
      }
      
      if (!basicProfile) {
        console.log('❌ No profile found for this user.');
        const createProfile = await prompt('Would you like to create a profile for this user? (y/n): ');
        
        if (createProfile.toLowerCase() === 'y') {
          await createUserProfile(targetUserId);
        }
      } else {
        console.log('✅ Basic profile found but relationship data is missing:');
        console.log(basicProfile);
        
        console.log('\nMissing relationship data for followers/following.');
        console.log('This can be fixed by creating some follow relationships.');
      }
    } else if (!profile) {
      console.log('❌ No profile found for this user.');
      const createProfile = await prompt('Would you like to create a profile for this user? (y/n): ');
      
      if (createProfile.toLowerCase() === 'y') {
        await createUserProfile(targetUserId);
      }
    } else {
      console.log('✅ Profile found:');
      console.log(profile);
      
      // Check for potential issues
      checkProfileIssues(profile);
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
  
  rl.close();
}

async function createUserProfile(userId) {
  const email = await prompt('Enter email for profile: ');
  const username = await prompt('Enter username for profile: ');
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email,
        username,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select();
    
    if (error) {
      console.error('❌ Failed to create profile:', error.message);
    } else {
      console.log('✅ Profile created successfully:');
      console.log(data[0]);
    }
  } catch (err) {
    console.error('❌ Unexpected error creating profile:', err.message);
  }
}

function checkProfileIssues(profile) {
  console.log('\nChecking for potential issues...');
  
  // Check required fields
  if (!profile.username) {
    console.log('❌ Missing username');
  }
  
  if (!profile.email) {
    console.log('❌ Missing email');
  }
  
  // Check relationships
  if (!profile.followers || !profile.following) {
    console.log('⚠️ Relationship data incomplete: Missing followers or following data');
  } else {
    console.log(`ℹ️ Followers: ${profile.followers.count}`);
    console.log(`ℹ️ Following: ${profile.following.count}`);
  }
  
  // Check optional fields that might improve profile
  if (!profile.avatar_url) {
    console.log('⚠️ No avatar set');
  }
  
  if (!profile.bio) {
    console.log('⚠️ No bio set');
  }
  
  if (!profile.first_name && !profile.last_name && !profile.full_name) {
    console.log('⚠️ No name information (first_name, last_name, or full_name)');
  }
  
  console.log('\nProfile check complete!');
}

// Run the main function
main().catch(err => {
  console.error('Unhandled error:', err);
  rl.close();
});
