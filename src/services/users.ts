// services/user.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const fetchData = async (url: string, method: string, body?: object) => {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`${method} request failed for ${url}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};

export const checkEmail = async (email: string) => {
  return await fetchData("/api/users/exists", "POST", { email });
};

export const registerUser = async (data: { name: string; email: string; role: string; password: string }) => {
  return await fetchData("/api/users/register", "POST", data);
};

export const loginUser = async (data: { email: string; password: string }) => {
  return await fetchData("/api/users/login", "POST", data);
};
