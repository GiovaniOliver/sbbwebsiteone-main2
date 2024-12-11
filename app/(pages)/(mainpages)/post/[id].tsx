import { useRouter } from 'next/router';

const Post: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Page logic here
  return <div>Post ID: {id}</div>;
}

export default Post;
