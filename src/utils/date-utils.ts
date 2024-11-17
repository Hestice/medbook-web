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

export const convertToISOString = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toISOString()
}

export const convertToDate = (dateStr: string): Date => {
  console.log(dateStr)
  const dateParts = dateStr.split(' ')
  const [date, time] = dateParts
  const formattedDate = `${date}T${time}`
  console.log(formattedDate)
  console.log(new Date(formattedDate))
  return new Date(formattedDate)
};