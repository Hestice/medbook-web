import { Comment } from '@/types/comment'

export interface Appointment {
  id: number;
  title: string;
  date: string;
  time_start: string;
  time_end: string;
  doctor: string;
  comments: Comment[];
  patient_name: string;
  availability_id: string
}

export interface Payload {
  patientId: string | null;
  doctorId: string;
  availabilityId: string;
  from: string;
  to: string;
  patient_name: string;
}

export interface DateRange {
  start_date: string;
  end_date: string;
}

export interface EditAppointment {
  time_start: string;
  time_end: string;
  patient_name: string;
  comment?: string;
}