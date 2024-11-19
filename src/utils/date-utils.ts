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
  const dateParts = dateStr.split(' ')
  const [date, time] = dateParts
  const formattedDate = `${date}T${time}`
  return new Date(formattedDate)
}

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString([], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const formattedTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  return { formattedDate, formattedTime }
}

export const convertTo24HourFormat = (time: string) => {
  const [hour, minute] = time.split(':');
  const [timeValue, period] = minute.split(' ');
  let hour24 = parseInt(hour, 10);

  if (period === 'PM' && hour24 < 12) {
    hour24 += 12
  } else if (period === 'AM' && hour24 === 12) {
    hour24 = 0
  }

  return `${hour24.toString().padStart(2, '0')}:${timeValue.padStart(2, '0')}`;
}

export const convertDateToISO =(date: string) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const formatReadableDate = (dateString: string)=> {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export const formatDateForForm = (date: string): string => {
  const singaporeDate = new Date(date).toLocaleDateString('en-GB', {
    timeZone: 'Asia/Singapore',
  });
  const [day, month, year] = singaporeDate.split('/');
  return `${year}-${month}-${day}`;
};