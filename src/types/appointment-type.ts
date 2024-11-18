import { Comment } from '@/types/comment'

export interface Appointment {
  id: number;
  title: string;
  date: string;
  time: string;
  doctor: string;
  comments: Comment[];
}