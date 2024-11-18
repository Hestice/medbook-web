import { Comment } from '@/types/comment'

export interface Appointment {
  id: number;
  title: string;
  date: string;
  time: string;
  doctor: string;
  comments: Comment[];
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