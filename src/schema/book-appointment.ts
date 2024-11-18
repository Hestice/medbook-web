import { z } from "zod";

const timeFormat = z.string().regex(
  /^\d{2}:\d{2}$/,
  "Invalid time format, expected 'HH:mm'"
);

const dateFormat = z.string().regex(
  /^\d{4}-\d{2}-\d{2}$/,
  "Invalid date format, expected 'YYYY-MM-DD'"
);

export const bookAppointmentSchema = z.object({
  name: z.string().min(1, "Patient name is required"),
  date: dateFormat,
  from: timeFormat,
  to: timeFormat,
  comment: z.string().optional()
});