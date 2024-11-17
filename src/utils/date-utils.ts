import { format, parseISO } from "date-fns"

export const formatDate = (dateString: string) => {
  const date = parseISO(dateString)
  return format(date, 'EEEE, MMMM d')
}

export const pastDates = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0)
  return date < today
};
