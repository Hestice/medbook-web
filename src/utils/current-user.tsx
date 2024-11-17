import { User } from '@/types/user'

export const fetchCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await fetch('http://localhost:8080/api/users/current_user', {
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
