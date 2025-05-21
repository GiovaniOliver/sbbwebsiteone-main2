import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface SearchResult {
  type: 'post' | 'user' | 'course';
  id: string;
  [key: string]: any;
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ 
    cookies: () => cookieStore 
  });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'all';
    const cursor = searchParams.get('cursor');
    const limit = 20;

    if (!query) {
      return new Response('Search query is required', { status: 400 });
    }

    let results: SearchResult[] = [];
    let nextCursor: string | null = null;

    switch (type) {
      case 'posts': {
        const { data: posts, error } = await supabase
          .from('posts')
          .select(`
            *,
            author:users!posts_author_id_fkey(
              id,
              username,
              avatar_url
            ),
            comments:comments(count),
            reactions:post_reactions(
              type,
              users!post_reactions_user_id_fkey(id)
            ),
            bookmarks:bookmarks(
              users!bookmarks_user_id_fkey(id)
            )
          `)
          .ilike('content', `%${query}%`)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (error) throw error;

        results = posts.map(post => ({
          type: 'post',
          ...post,
          userName: post.author.username,
          userImage: post.author.avatar_url,
          commentCount: post.comments.length,
          reactions: Object.entries(
            post.reactions.reduce((acc: Record<string, number>, r: any) => {
              acc[r.type] = (acc[r.type] || 0) + 1;
              return acc;
            }, {})
          ).map(([type, count]) => ({ type, count })),
          userReactions: post.reactions
            .filter((r: any) => r.users.id === session.user.id)
            .map((r: any) => r.type),
          isBookmarked: post.bookmarks.some((b: any) => b.users.id === session.user.id)
        }));
        break;
      }

      case 'users': {
        const { data: users, error } = await supabase
          .from('users')
          .select(`
            *,
            posts:posts(count),
            followers:followers!followers_following_id_fkey(count),
            following:followers!followers_follower_id_fkey(
              following_id,
              follower_id
            )
          `)
          .or(`username.ilike.%${query}%,first_name.ilike.%${query}%,last_name.ilike.%${query}%`)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (error) throw error;

        results = users.map(user => ({
          type: 'user',
          ...user,
          postCount: user.posts.length,
          followerCount: user.followers.length,
          isFollowing: user.following.some((f: any) => f.follower_id === session.user.id)
        }));
        break;
      }

      case 'courses': {
        const { data: courses, error } = await supabase
          .from('courses')
          .select(`
            *,
            instructor:users!courses_instructor_id_fkey(
              username,
              avatar_url
            ),
            enrollments:course_enrollments(count),
            user_enrollment:course_enrollments!course_enrollments_user_id_fkey(
              user_id
            )
          `)
          .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (error) throw error;

        results = courses.map(course => ({
          type: 'course',
          ...course,
          instructorName: course.instructor.username,
          instructorImage: course.instructor.avatar_url,
          enrollmentCount: course.enrollments.length,
          isEnrolled: course.user_enrollment.some((e: any) => e.user_id === session.user.id)
        }));
        break;
      }

      default: {
        // Search all types
        const [postsRes, usersRes, coursesRes] = await Promise.all([
          supabase
            .from('posts')
            .select(`
              *,
              author:users!posts_author_id_fkey(
                username,
                avatar_url
              )
            `)
            .ilike('content', `%${query}%`)
            .limit(limit),

          supabase
            .from('users')
            .select('*')
            .or(`username.ilike.%${query}%,first_name.ilike.%${query}%,last_name.ilike.%${query}%`)
            .limit(limit),

          supabase
            .from('courses')
            .select(`
              *,
              instructor:users!courses_instructor_id_fkey(
                username,
                avatar_url
              )
            `)
            .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
            .limit(limit)
        ]);

        if (postsRes.error) throw postsRes.error;
        if (usersRes.error) throw usersRes.error;
        if (coursesRes.error) throw coursesRes.error;

        results = [
          ...postsRes.data.map(post => ({
            type: 'post',
            ...post,
            userName: post.author.username,
            userImage: post.author.avatar_url
          })),
          ...usersRes.data.map(user => ({
            type: 'user',
            ...user
          })),
          ...coursesRes.data.map(course => ({
            type: 'course',
            ...course,
            instructorName: course.instructor.username,
            instructorImage: course.instructor.avatar_url
          }))
        ];
        break;
      }
    }

    // Set next cursor for paginated results
    if (type !== 'all' && results.length === limit) {
      nextCursor = results[results.length - 1].id;
    }

    return NextResponse.json({
      success: true,
      data: {
        results,
        nextCursor
      }
    });
  } catch (error) {
    console.error('Error performing search:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 