import { Appointment, DateRange, Payload } from "@/types/appointment-type";
import { format } from "date-fns";
import { getDoctorDetails } from "./availability-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
interface ApiAppointment {
  id: number;
  appointment_from: string;
  patient_name: string;
  doctorId: string;
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
    if (response.status === 204) {
      return null
    }

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

const transformAppointments = async (apiAppointments: ApiAppointment[]): Promise<Appointment[]> => {
  return await Promise.all(apiAppointments.map(async appointment => {
    const appointmentFrom = new Date(appointment.appointment_from);
    const doctor = await getDoctorDetails(appointment.doctorId);
    return {
      id: appointment.id,
      title: `Appointment for ${appointment.patient_name}`,
      date: format(appointmentFrom, 'yyyy-MM-dd'),
      time: format(appointmentFrom, 'HH:mm'),
      doctor: `Dr. ${doctor.name}`,
      comments: [],
    };
  }));
};

export const listAppointments = async (dateRange?: DateRange): Promise<Appointment[]> => {
  try {
    const url = dateRange
      ? `/api/appointments/?start_date=${dateRange.start_date}&end_date=${dateRange.end_date}`
      : '/api/appointments/';

    const response = await fetchData(url, 'GET')
    return transformAppointments(response)
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const deleteAppointment = async (id: number): Promise<void> => {
  try {
    console.log("deleting: ", id)
    await fetchData(`/api/appointments/${id}`, 'DELETE');
    // Since we expect no response body, we can skip the check here.
    console.log('Appointment deleted:', id);
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};