import { Availability } from '@/types/availability'

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
    console.log(availabilities)
    if (!response.ok) {
      throw new Error('Failed to create availabilities')
    }

    const data = await response.json()
    console.log(data.message)
  } catch (error) {
    console.error('Error creating availabilities:', error)
  }
}

export const updateAvailability = async (id: string, availability: Availability) => {
  try {
    const response = await fetch(`/api/availabilities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(availability)
    })

    if (!response.ok) {
      throw new Error('Failed to update availability')
    }

    const data = await response.json()
    console.log(data.message)
  } catch (error) {
    console.error('Error updating availability:', error)
  }
}

export const deleteAvailability = async (id: string) => {
  try {
    const response = await fetch(`/api/availabilities/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Failed to delete availability')
    }

    console.log('Availability deleted')
  } catch (error) {
    console.error('Error deleting availability:', error)
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
