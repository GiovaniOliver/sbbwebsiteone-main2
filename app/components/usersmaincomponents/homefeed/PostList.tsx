import Post from './Post'

const posts = [
  {
    id: 1,
    author: "Cameron Williamson",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    date: "23 Aug at 4:21 PM",
    content: "Check out these amazing landscapes!",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFuZHNjYXBlfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFuZHNjYXBlfGVufDB8fDB8fHww"
    ],
    likes: 30,
    comments: 12,
    shares: 5,
  },
  {
    id: 2,
    author: "Theresa Webb",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
    date: "22 Aug at 2:15 PM",
    content: "Just finished this amazing book! Highly recommend it.",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D"
    ],
    likes: 45,
    comments: 8,
    shares: 2,
  },
]

export default function PostList() {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

