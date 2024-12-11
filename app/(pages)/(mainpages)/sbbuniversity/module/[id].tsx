import { useRouter } from 'next/router';

const Module: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Page logic here
  return <div>Module ID: {id}</div>;
}

export default Module;
