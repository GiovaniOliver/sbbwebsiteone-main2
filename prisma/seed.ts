import { PrismaClient, PostType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seeding...')

  // Clean up existing data
  await prisma.$transaction([
    prisma.like.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.post.deleteMany(),
    prisma.follow.deleteMany(),
    prisma.user.deleteMany(),
  ])

  // Create test users
  const user1 = await prisma.user.create({
    data: {
      clerkId: 'user_test1',
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      badges: JSON.stringify(['verified', 'premium']),
      isVerified: true,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      clerkId: 'user_test2',
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
      badges: JSON.stringify(['new']),
      isVerified: false,
    },
  })

  // Create test posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        content: 'Hello everyone! Excited to join the SBB DAO community! 👋',
        type: PostType.text,
        authorId: user1.id,
      },
    }),
    prisma.post.create({
      data: {
        content: 'Just finished working on an amazing blockchain project! 🚀',
        type: PostType.text,
        authorId: user2.id,
      },
    }),
    prisma.post.create({
      data: {
        content: 'Check out our latest community event!',
        type: PostType.image,
        mediaUrl: 'https://picsum.photos/seed/event1/800/600',
        authorId: user1.id,
      },
    }),
  ])

  // Create some likes
  await Promise.all([
    prisma.like.create({
      data: {
        postId: posts[0].id,
        userId: user2.id,
      },
    }),
    prisma.like.create({
      data: {
        postId: posts[1].id,
        userId: user1.id,
      },
    }),
  ])

  // Create some comments
  await Promise.all([
    prisma.comment.create({
      data: {
        content: 'Welcome to the community! 🎉',
        postId: posts[0].id,
        userId: user2.id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'Amazing work! Looking forward to hearing more about it.',
        postId: posts[1].id,
        userId: user1.id,
      },
    }),
  ])

  console.log('Seeding completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 