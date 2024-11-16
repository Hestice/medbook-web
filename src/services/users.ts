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
};