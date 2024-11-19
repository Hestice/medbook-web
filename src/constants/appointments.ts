import { Role } from "@/enums/role";
import { bookAppointmentSchema } from "@/schema/book-appointment";
import { Slot } from "@/types/availability";
import { User } from "@/types/user";
import { z } from "zod";

export const upcomingAppointments = [
  { id: 1, doctor: 'Dr. Smith', specialty: 'Cardiology', date: '2024-11-20', time: '10:00 AM' },
  { id: 2, doctor: 'Dr. Johnson', specialty: 'Dermatology', date: '2024-11-22', time: '2:30 PM' },
]

export function buildPayload(values: z.infer<typeof bookAppointmentSchema>, slot: Slot, user: User | null) {
  const { name, date, from, to } = values;

  return {
      patientId: user?.role === Role.Patient ? user.uuid : null,
      doctorId: slot.doctorId,
      availabilityId: slot.id,
      from: `${date} ${from}:00`,
      to: `${date} ${to}:00`,
      patient_name: name,
  };
}

export function editAppointmentPayload(values: z.infer<typeof bookAppointmentSchema>, availabilityId?: string) {
  const { name, date, from, to, comment } = values;

  return {
    time_start: `${date} ${from}:00`, 
    time_end: `${date} ${to}:00`,
    patient_name: name,
    comment: comment || "",
    availabilityId: availabilityId || undefined,
  };
}
