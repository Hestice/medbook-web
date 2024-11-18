import { z } from "zod"

const dateTimeFormat = z.string().regex(
  /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
  "Invalid date-time format, expected 'YYYY-MM-DD HH:mm:ss'"
)

export const bookAppointmentSchema = z.object({
  name: z.string().min(1, "Patient name is required"),
  from: dateTimeFormat,
  to: dateTimeFormat,
  comment: z.string().optional()
})