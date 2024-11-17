export const logout = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/users/logout', {
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
