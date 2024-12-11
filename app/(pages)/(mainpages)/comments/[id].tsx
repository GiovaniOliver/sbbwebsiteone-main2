import { useRouter } from 'next/router';

const Comment: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Page logic here
  return <div>Comment ID: {id}</div>;
}

export default Comment;