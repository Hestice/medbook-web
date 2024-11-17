import { User } from '@/types/user';
import { fetchCurrentUser } from '@/utils/current-user';
import { useEffect, useState } from 'react'

export default function GetCurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchCurrentUser();
        if (userData) {
          setUser(userData);
        } else {
          console.log('No user logged in or session expired');
        }
      } catch (error) {
        console.log('Failed to load user data', error);
      }
    };

    getUserData();
  }, []);
  return user
}
