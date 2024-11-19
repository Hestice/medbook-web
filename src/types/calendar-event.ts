export interface CalendarEvent {
  start: Date | string;
  end: Date | string;
  title: string;
  availability_id?: string;
}