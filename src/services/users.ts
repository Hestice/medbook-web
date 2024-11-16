export const checkEmail = async (email: string) => {
  try {
    const response = await fetch("http://localhost:8080/api/users/exists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to check email existence")
    }

    return await response.json()
  } catch (error) {
    console.error("Error checking email:", error)
    throw error
  }
}

export const registerUser = async (data: { name: string, email: string, role: string, password: string }) => {
  try {
    const response = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to register user")
    }

    return await response.json()
  } catch (error) {
    console.error("Error registering user:", error)
    throw error
  }
}