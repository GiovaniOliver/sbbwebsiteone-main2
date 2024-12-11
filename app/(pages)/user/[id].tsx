import { useRouter } from 'next/router';

const User: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Page logic here
  return <div>User ID: {id}</div>;
}

export default User;
