/**
 * This script creates test users and content in the database
 * Run with: node scripts/create-test-data.js
 */

require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Test users data
const testUsers = [
  {
    email: 'john.doe@example.com',
    password: 'Password123!',
    username: 'johndoe',
    full_name: 'John Doe',
    avatar_url: 'https://i.pravatar.cc/150?u=johndoe',
    bio: 'Tech enthusiast and business owner. Love to connect with like-minded people.',
    website: 'https://johndoe.example.com'
  },
  {
    email: 'jane.smith@example.com',
    password: 'Password123!',
    username: 'janesmith',
    full_name: 'Jane Smith',
    avatar_url: 'https://i.pravatar.cc/150?u=janesmith',
    bio: 'Community organizer and small business advocate. Passionate about empowering entrepreneurs.',
    website: 'https://janesmith.example.com'
  },
  {
    email: 'mike.williams@example.com',
    password: 'Password123!',
    username: 'mikewilliams',
    full_name: 'Mike Williams',
    avatar_url: 'https://i.pravatar.cc/150?u=mikewilliams',
    bio: 'Digital marketing specialist focusing on black-owned businesses. Let\'s connect!',
    website: 'https://mikewilliams.example.com'
  },
  {
    email: 'sarah.johnson@example.com',
    password: 'Password123!',
    username: 'sarahjohnson',
    full_name: 'Sarah Johnson',
    avatar_url: 'https://i.pravatar.cc/150?u=sarahjohnson',
    bio: 'Financial advisor specializing in small business growth. Here to help entrepreneurs thrive.',
    website: 'https://sarahjohnson.example.com'
  },
  {
    email: 'david.brown@example.com',
    password: 'Password123!',
    username: 'davidbrown',
    full_name: 'David Brown',
    avatar_url: 'https://i.pravatar.cc/150?u=davidbrown',
    bio: 'Restaurant owner and culinary expert. Eager to share experiences with fellow business owners.',
    website: 'https://davidbrown.example.com'
  }
];

// Sample post content for testing
const samplePosts = [
  {
    content: 'Just launched my new business website! Check it out and let me know what you think. #SmallBusiness #Entrepreneurship',
    images: ['https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d']
  },
  {
    content: 'Excited to announce that we\'re expanding our services to include digital marketing consultations. Book your slot now! #GrowYourBusiness',
    images: ['https://images.unsplash.com/photo-1552581234-26160f608093']
  },
  {
    content: 'Had an amazing networking session yesterday. Met so many inspiring entrepreneurs! Looking forward to collaborating. #Networking #BusinessGrowth',
    images: ['https://images.unsplash.com/photo-1556761175-4b46a572b786']
  },
  {
    content: 'Grateful for our community\'s support. We celebrated our 5th anniversary yesterday! #Milestone #ThankYou',
    images: ['https://images.unsplash.com/photo-1513151233558-d860c5398176']
  },
  {
    content: 'Just received a business grant that will help us improve our infrastructure. If you need advice on grant applications, feel free to reach out! #BusinessGrants #SmallBusinessSupport',
    images: ['https://images.unsplash.com/photo-1626285861696-0fbbec9cc236']
  },
  {
    content: 'New product line launching next month! Here\'s a sneak peek. Stay tuned for more updates. #NewProduct #Innovation',
    images: ['https://images.unsplash.com/photo-1554224155-8d04cb21eb6c']
  },
  {
    content: 'Taking a moment to appreciate our amazing team. Couldn\'t have achieved this growth without them! #TeamAppreciation #BusinessSuccess',
    images: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c']
  }
];

// Main function to create test data
async function createTestData() {
  console.log('Starting test data creation...');
  
  const createdUserIds = [];
  
  // Create test users
  for (const userData of testUsers) {
    try {
      // Create auth user
      console.log(`Creating user: ${userData.email}`);
      
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true,
        user_metadata: {
          username: userData.username
        }
      });
      
      if (authError) {
        console.error(`Error creating auth user ${userData.email}:`, authError);
        continue;
      }
      
      console.log(`Created auth user: ${authUser.user.id}`);
      createdUserIds.push(authUser.user.id);
      
      // Update profile with additional info
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: userData.full_name,
          avatar_url: userData.avatar_url,
          bio: userData.bio,
          website: userData.website
        })
        .eq('id', authUser.user.id);
        
      if (profileError) {
        console.error(`Error updating profile for ${userData.email}:`, profileError);
      } else {
        console.log(`Updated profile for: ${userData.email}`);
      }
    } catch (error) {
      console.error(`Error processing user ${userData.email}:`, error);
    }
  }
  
  // Create follow relationships (each user follows 2 random users)
  if (createdUserIds.length > 2) {
    for (const userId of createdUserIds) {
      const otherUserIds = createdUserIds.filter(id => id !== userId);
      const randomUserIds = getRandomElements(otherUserIds, 2);
      
      for (const followId of randomUserIds) {
        try {
          console.log(`Creating follow relationship: ${userId} -> ${followId}`);
          
          const { error: followError } = await supabase
            .from('follows')
            .insert({
              follower_id: userId,
              following_id: followId
            });
            
          if (followError) {
            console.error(`Error creating follow relationship ${userId} -> ${followId}:`, followError);
          }
        } catch (error) {
          console.error(`Error processing follow relationship:`, error);
        }
      }
    }
  }
  
  // Create posts for each user
  for (const userId of createdUserIds) {
    // Each user creates 1-3 random posts
    const numPosts = Math.floor(Math.random() * 3) + 1;
    const selectedPosts = getRandomElements(samplePosts, numPosts);
    
    for (const postData of selectedPosts) {
      try {
        console.log(`Creating post for user: ${userId}`);
        
        // Check if posts table exists in the database
        const { data: postsTable, error: tableError } = await supabase
          .from('posts')
          .select('*')
          .limit(1);
          
        if (tableError) {
          console.error('Posts table does not exist or cannot be accessed:', tableError);
          console.log('Skipping post creation as the "posts" table may not exist yet');
          break;
        }
        
        // Insert post
        const { error: postError } = await supabase
          .from('posts')
          .insert({
            author_id: userId,
            content: postData.content,
            images: postData.images
          });
          
        if (postError) {
          console.error(`Error creating post for ${userId}:`, postError);
        } else {
          console.log(`Created post for: ${userId}`);
        }
      } catch (error) {
        console.error(`Error processing post:`, error);
      }
    }
  }
  
  console.log('Test data creation completed!');
}

// Helper function to get random elements from an array
function getRandomElements(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Execute the main function
createTestData()
  .catch(error => {
    console.error('Error in test data creation script:', error);
    process.exit(1);
  }); 