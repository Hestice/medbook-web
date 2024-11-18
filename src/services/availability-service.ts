import { Availability, Doctor } from '@/types/availability'
import { PaginatedResponse } from '@/types/paginate';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const createAvailabilities = async (availabilities: Availability[]) => {
  try {
    const response = await fetch(`${API_URL}/api/availabilities/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(availabilities),
      credentials: 'include',
    })
    if (!response.ok) {
      throw new Error('Failed to create availabilities')
    }

    const data = await response.json()
    console.log(data.message)
  } catch (error) {
    console.error('Error creating availabilities:', error)
  }
}

export const listAvailabilities = async () => {
  try {
    const response = await fetch(`${API_URL}/api/availabilities/`, {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch availabilities')
    }

    const data = await response.json()
    return data as Availability[]
  } catch (error) {
    console.error('Error fetching availabilities:', error)
    return []
  }
}

export const listPaginatedAvailabilities = async (
  page: number = 1,
  perPage: number = 5
): Promise<PaginatedResponse<Availability>> => {
  try {
    const response = await fetch(
      `${API_URL}/api/availabilities/patient?page=${page}&per_page=${perPage}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch availabilities: ${response.statusText}`)
    }

    const data = (await response.json()) as PaginatedResponse<Availability>
    return data
  } catch (error) {
    console.error('Error fetching availabilities:', error)
    return {
      total: 0,
      page,
      per_page: perPage,
      availabilities: [],
    }
  }
}


export const getDoctorDetails = async (doctorId: string): Promise<Doctor> => {
  try {
    const response = await fetch(`${API_URL}/api/availabilities/doctor/${doctorId}`, {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch doctor details: ${response.statusText}`)
    }

    const doctor = (await response.json()) as Doctor
    return doctor
  } catch (error) {
    console.error('Error fetching doctor details:', error)
    throw error
  }
}