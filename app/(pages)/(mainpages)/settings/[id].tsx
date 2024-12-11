import { useRouter } from 'next/router';

const Settings: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Page logic here
  return <div>Settings for User ID: {id}</div>;
}

export default Settings;
