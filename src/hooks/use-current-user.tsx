import { User } from '@/types/user';
import { fetchCurrentUser } from '@/utils/current-user';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      const userData = await fetchCurrentUser();
      return userData;
    } catch (error) {
      console.error('Failed to load user data', error);
      return null;
    }
  };

  useEffect(() => {
    const redirectToHome = () => {
      router.push('/')
    };

    const getUserData = async () => {
      const userData = await fetchUserData();
  
      if (!userData) {
        if (window.location.pathname !== '/') {
          redirectToHome();
        }
      } else {
        setUser(userData);
        if (window.location.pathname === '/') {
          router.push('/dashboard');
        }
      }
      setLoading(false);
    };

    if (loading) {
      getUserData();
    }
  }, [loading, router]);

  return { user, loading };
}
