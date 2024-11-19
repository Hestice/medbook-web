import { Appointment, DateRange, EditAppointment, Payload } from "@/types/appointment-type";
import { format } from "date-fns";
import { getDoctorDetails } from "./availability-service";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
interface ApiAppointment {
  id: number;
  appointment_from: string;
  appointment_to: string;
  patient_name: string;
  doctorId: string;
  availabilityId: string
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
    const appointmentTo = new Date(appointment.appointment_to);
    const doctor = await getDoctorDetails(appointment.doctorId);
    return {
      id: appointment.id,
      title: `Appointment for ${appointment.patient_name}`,
      date: format(appointmentFrom, 'yyyy-MM-dd'),
      time_start: format(appointmentFrom, 'HH:mm'),
      time_end: format(appointmentTo, 'HH:mm'),
      doctor: `Dr. ${doctor.name}`,
      comments: [],
      patient_name: appointment.patient_name,
      availability_id: appointment.availabilityId
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
    console.log('Appointment deleted:', id);
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};

export const updateAppointment = async (id: number, data: EditAppointment): Promise<void> => {
  try {
    const response = await fetchData(`/api/appointments/${id}`, 'PUT', data);
    if (response && response.status === 200) {
      console.log('Appointment updated:', id);
    }
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};

export const listAvailabilitySlots = async (doctorId: string) => {
  try {
    const response = await fetchData(`/api/list?doctorId=${doctorId}`, 'GET');
    return response;
  } catch (error) {
    console.error('Error fetching availability slots:', error);
    throw error;
  }
};