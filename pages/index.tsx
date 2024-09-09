import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/panel');
  }, [router]);

  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/panel',
      permanent: false,
    },
  };
}
