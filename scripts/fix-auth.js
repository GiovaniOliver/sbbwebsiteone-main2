// fix-auth.js - Script to diagnose and fix authentication issues
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const readline = require('readline');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Supabase URL or Anon Key is missing in environment variables.');
  process.exit(1);
}

// Create clients with different access levels
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const adminSupabase = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Utility to prompt for input
const prompt = (question) => new Promise((resolve) => rl.question(question, resolve));

async function main() {
  console.log('🔧 Authentication Fix Script 🔧');
  console.log('---------------------------------');
  
  console.log('Checking Supabase connection...');
  try {
    const { data, error } = await supabase.from('profiles').select('count');
    if (error) throw error;
    console.log('✅ Connected to Supabase successfully!');
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    rl.close();
    return;
  }
  
  console.log('---------------------------------');
  console.log('1. Verify and repair profiles table');
  console.log('2. Test sign in with email/password');
  console.log('3. Check user authorization and permissions');
  console.log('4. Create a test user account');
  console.log('5. Exit');
  console.log('---------------------------------');
  
  const choice = await prompt('Enter your choice (1-5): ');
  
  switch (choice) {
    case '1':
      await verifyProfiles();
      break;
    case '2':
      await testSignIn();
      break;
    case '3':
      await checkPermissions();
      break;
    case '4':
      await createTestUser();
      break;
    case '5':
      console.log('Exiting...');
      rl.close();
      return;
    default:
      console.log('Invalid choice');
      rl.close();
      return;
  }
  
  // Return to main menu
  await main();
}

async function verifyProfiles() {
  console.log('\nVerifying profiles table...');
  
  // 1. Get auth users
  if (!adminSupabase) {
    console.log('❗ Note: Service role key is required to list all auth users. Checking with anon key instead.');
    // Get the current session to check at least the current user
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData.session) {
      console.log('❌ No authenticated user session found.');
      return;
    }
    
    const { data: userData } = await supabase.auth.getUser();
    const users = userData.user ? [userData.user] : [];
    console.log(`Found 1 authenticated user (current session)`);
  
    // Continue with the current user only
    await verifyProfilesForUsers(users);
    return;
  }
  
  const { data, error } = await adminSupabase.auth.admin.listUsers();
  
  if (error) {
    console.error('❌ Failed to list auth users:', error.message);
    return;
  }
  
  const users = data?.users || [];
  console.log(`Found ${users.length} auth users`);
  
  await verifyProfilesForUsers(users);
}

async function verifyProfilesForUsers(users) {
  // 2. Get profiles
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*');
    
  if (profilesError) {
    console.error('❌ Failed to fetch profiles:', profilesError.message);
    return;
  }
  
  console.log(`Found ${profiles.length} profiles`);
  
  // 3. Check for auth users without profiles
  const profileIds = profiles.map(p => p.id);
  const missingProfiles = users.filter(u => !profileIds.includes(u.id));
  
  if (missingProfiles.length > 0) {
    console.log(`❌ Found ${missingProfiles.length} users without profiles:`);
    missingProfiles.forEach(u => console.log(`- ${u.email} (${u.id})`));
    
    const shouldFix = await prompt('Would you like to create missing profiles? (y/n): ');
    
    if (shouldFix.toLowerCase() === 'y') {
      console.log('Creating missing profiles...');
      
      for (const user of missingProfiles) {
        // Create a profile
        const username = user.email.split('@')[0] + '_' + Math.floor(Math.random() * 1000);
        
        const { data, error } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            username: username,
            email: user.email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          
        if (error) {
          console.error(`❌ Failed to create profile for ${user.email}:`, error.message);
        } else {
          console.log(`✅ Created profile for ${user.email}`);
        }
      }
    }
  } else {
    console.log('✅ All auth users have associated profiles.');
  }
  
  // 4. Check for profiles without auth users
  const userIds = users.map(u => u.id);
  const orphanedProfiles = profiles.filter(p => !userIds.includes(p.id));
  
  if (orphanedProfiles.length > 0) {
    console.log(`❌ Found ${orphanedProfiles.length} orphaned profiles (profiles without auth users):`);
    orphanedProfiles.forEach(p => console.log(`- ${p.username} (${p.id})`));
    
    const shouldDelete = await prompt('Would you like to delete orphaned profiles? (y/n): ');
    
    if (shouldDelete.toLowerCase() === 'y') {
      console.log('Deleting orphaned profiles...');
      
      for (const profile of orphanedProfiles) {
        const { error } = await supabase
          .from('profiles')
          .delete()
          .eq('id', profile.id);
          
        if (error) {
          console.error(`❌ Failed to delete profile ${profile.username}:`, error.message);
        } else {
          console.log(`✅ Deleted profile ${profile.username}`);
        }
      }
    }
  } else {
    console.log('✅ No orphaned profiles found.');
  }
}

async function testSignIn() {
  console.log('\nTesting sign in...');
  
  const email = await prompt('Enter email: ');
  const password = await prompt('Enter password: ');
  
  console.log('Attempting sign in...');
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('❌ Sign in failed:', error.message);
      return;
    }
    
    console.log('✅ Sign in successful!');
    console.log(`User ID: ${data.user.id}`);
    
    // Check if profile exists
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
      
    if (profileError) {
      console.error('❌ Profile check failed:', profileError.message);
      
      const shouldCreateProfile = await prompt('Would you like to create a profile for this user? (y/n): ');
      
      if (shouldCreateProfile.toLowerCase() === 'y') {
        const username = email.split('@')[0] + '_' + Math.floor(Math.random() * 1000);
        
        const { error: createError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            username: username,
            email: email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          
        if (createError) {
          console.error('❌ Failed to create profile:', createError.message);
        } else {
          console.log('✅ Profile created successfully!');
        }
      }
    } else {
      console.log('✅ User profile exists:');
      console.log(`Username: ${profile.username}`);
      console.log(`Email: ${profile.email}`);
    }
  } catch (err) {
    console.error('❌ Unexpected error during sign in:', err.message);
  }
}

async function checkPermissions() {
  console.log('\nChecking user permissions...');
  
  // Check if we have an authenticated user
  const { data: session } = await supabase.auth.getSession();
  
  if (!session.session) {
    console.log('❌ No authenticated user. Please sign in first.');
    await testSignIn();
    return;
  }
  
  const userId = session.session.user.id;
  console.log(`Testing permissions for user ID: ${userId}`);
  
  // Test profile read
  console.log('Testing profile read...');
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (profileError) {
    console.error('❌ Cannot read own profile:', profileError.message);
    
    console.log('Checking Row Level Security (RLS) policies...');
    const { data: policies, error: policiesError } = await supabase.rpc('get_policies');
    
    if (policiesError) {
      console.error('❌ Cannot check policies:', policiesError.message);
      console.log('This may require service role key or manual investigation in Supabase dashboard.');
    } else {
      console.log('Policies:');
      console.log(policies);
    }
  } else {
    console.log('✅ Can read own profile.');
  }
  
  // Test profile update
  console.log('Testing profile update...');
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', userId);
    
  if (updateError) {
    console.error('❌ Cannot update own profile:', updateError.message);
    console.log('This suggests RLS issues with profile updates.');
  } else {
    console.log('✅ Can update own profile.');
  }
  
  // Test other tables the user might need access to
  const tables = ['posts', 'post_likes', 'follows'];
  
  for (const table of tables) {
    console.log(`Testing read access to ${table}...`);
    const { error: tableError } = await supabase
      .from(table)
      .select('count');
      
    if (tableError) {
      console.error(`❌ Cannot read ${table}:`, tableError.message);
    } else {
      console.log(`✅ Can read ${table}.`);
    }
  }
}

async function createTestUser() {
  console.log('\nCreating test user...');
  
  const email = await prompt('Enter email for test user: ');
  const password = await prompt('Enter password for test user: ');
  const username = await prompt('Enter username for test user: ');
  
  try {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
    });
    
    if (authError) {
      console.error('❌ Failed to create auth user:', authError.message);
      return;
    }
    
    console.log('✅ Auth user created successfully!');
    console.log(`User ID: ${authData.user.id}`);
    
    // Check if profile was auto-created by trigger
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();
      
    if (profileError) {
      console.log('❌ Profile not auto-created. Creating manually...');
      
      const { error: createError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          username,
          email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
      if (createError) {
        console.error('❌ Failed to create profile manually:', createError.message);
      } else {
        console.log('✅ Profile created manually.');
      }
    } else {
      console.log('✅ Profile auto-created by trigger!');
    }
    
    console.log('\nTest user created successfully:');
    console.log(`Email: ${email}`);
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log('You can now test sign in with these credentials.');
    
  } catch (err) {
    console.error('❌ Unexpected error during user creation:', err.message);
  }
}

// Run the main function
main().catch(err => {
  console.error('Unhandled error:', err);
  rl.close();
});
