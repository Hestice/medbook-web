const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/api/users/logout`, {
      method: 'POST',
      credentials: 'include'
    });

    if (response.ok) {
      window.location.href = '/'
    } else {
      console.error('Failed to log out')
    }
  } catch (error) {
    console.error('Logout error', error)
  }
};
