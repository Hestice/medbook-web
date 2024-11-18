import { User } from '@/types/user'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const fetchCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await fetch(`${API_URL}/api/users/current_user`, {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch currnt user');
    }

    const data: User = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
};
