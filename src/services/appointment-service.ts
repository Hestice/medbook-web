const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

interface Payload {
  patientId: string | null;
  doctorId: string;
  availabilityId: string;
  from: string;
  to: string;
  patient_name: string;
}

const fetchData = async (url: string, method: string, body?: object) => {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    })
    if (!response.ok) {
      throw new Error(`${method} request failed for ${url}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error in API request:", error)
    throw error;
  }
};

export const bookAppointment = async (payload: Payload) => {
  return await fetchData('/api/appointments/', "POST",  payload )
};