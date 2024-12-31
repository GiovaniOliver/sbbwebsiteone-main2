import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// Define types for external accounts
interface ExternalAccount {
  google?: {
    id: string;
    email: string;
  };
}

async function main() {
  // Create test users with different types
  const regularUser = await prisma.user.create({
    data: {
      clerkId: 'user_2TVIS5Adk5aYxjvNpp0Br68AtSJ',
      email: 'giovani.company@gmail.com',
      username: 'giobeats',
      firstName: 'Giovani',
      lastName: 'O',
      avatar: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJqSHVjMXFkZ09NaXRrVndpNEtMVU42b0FsYyJ9',
      reputationScore: 100,
      web3Wallets: JSON.stringify([]),
      role: 'user',
      badges: JSON.stringify(['early_adopter', 'verified']),
      phoneNumbers: JSON.stringify([]),
      emailAddresses: JSON.stringify(['giovani.company@gmail.com']),
      externalAccounts: {
        google: {
          id: '115277973573621734857',
          email: 'giovani.company@gmail.com'
        }
      },
      userType: 'REGULAR_USER'
    },
  })

  const businessOwner = await prisma.user.create({
    data: {
      clerkId: 'business_owner_test',
      email: 'business@example.com',
      username: 'businessowner',
      firstName: 'Business',
      lastName: 'Owner',
      reputationScore: 500,
      web3Wallets: JSON.stringify([]),
      badges: JSON.stringify(['business_verified']),
      phoneNumbers: JSON.stringify([]),
      emailAddresses: JSON.stringify(['business@example.com']),
      userType: 'BUSINESS_OWNER',
      businessTier: 'PROFESSIONAL'
    },
  })

  const communitySupporter = await prisma.user.create({
    data: {
      clerkId: 'community_supporter_test',
      email: 'supporter@example.com',
      username: 'supporter',
      firstName: 'Community',
      lastName: 'Supporter',
      reputationScore: 300,
      web3Wallets: JSON.stringify([]),
      badges: JSON.stringify(['community_supporter']),
      phoneNumbers: JSON.stringify([]),
      emailAddresses: JSON.stringify(['supporter@example.com']),
      userType: 'COMMUNITY_SUPPORTER',
      communitySupporterLevel: 'COMMUNITY_COLLABORATORS'
    },
  })

  const communityOrganizer = await prisma.user.create({
    data: {
      clerkId: 'community_organizer_test',
      email: 'organizer@example.com',
      username: 'organizer',
      firstName: 'Community',
      lastName: 'Organizer',
      reputationScore: 800,
      web3Wallets: JSON.stringify([]),
      badges: JSON.stringify(['community_organizer']),
      phoneNumbers: JSON.stringify([]),
      emailAddresses: JSON.stringify(['organizer@example.com']),
      userType: 'ADMIN',
      communityOrganizerLevel: 'AMBASSADOR',
      communityOrganizationRole: 'PRESIDENT'
    },
  })

  // Create test posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        content: 'Hello everyone! Excited to join this community! 🎉',
        type: 'TEXT',
        author: { connect: { id: regularUser.id } }
      },
    }),
    prisma.post.create({
      data: {
        content: 'Check out my latest business venture!',
        type: 'IMAGE',
        mediaUrl: 'https://picsum.photos/800/600',
        author: { connect: { id: businessOwner.id } }
      },
    }),
  ])

  // Create marketplace
  const marketplace = await prisma.marketplace.create({
    data: {
      name: 'SBB Marketplace',
      description: 'Buy and sell items in the SBB community',
    },
  })

  // Create marketplace items
  await Promise.all([
    prisma.item.create({
      data: {
        name: 'Business Consultation',
        description: 'One hour business consultation session',
        price: 10000, // $100.00
        marketplace: { connect: { id: marketplace.id } },
        owner: { connect: { id: businessOwner.id } }
      },
    }),
    prisma.item.create({
      data: {
        name: 'Community Workshop',
        description: 'Virtual workshop on community building',
        price: 5000, // $50.00
        marketplace: { connect: { id: marketplace.id } },
        owner: { connect: { id: communitySupporter.id } }
      },
    }),
  ])

  // Add some comments
  const comment = await prisma.comment.create({
    data: {
      content: 'Welcome to the community!',
      user: { connect: { id: communitySupporter.id } },
      post: { connect: { id: posts[0].id } }
    },
  })

  // Add a reply to the comment
  await prisma.comment.create({
    data: {
      content: 'Thank you so much!',
      user: { connect: { id: regularUser.id } },
      post: { connect: { id: posts[0].id } },
      parent: { connect: { id: comment.id } }
    },
  })

  // Add some likes
  await Promise.all(
    posts.map((post) =>
      prisma.like.create({
        data: {
          user: { connect: { id: communitySupporter.id } },
          post: { connect: { id: post.id } }
        }
      })
    )
  )

  // Add comment reactions
  await prisma.commentReaction.create({
    data: {
      type: '👍',
      user: { connect: { id: regularUser.id } },
      comment: { connect: { id: comment.id } }
    },
  })

  console.log('Database seeded with various user types and marketplace data!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 