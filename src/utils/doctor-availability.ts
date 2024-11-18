import { getDoctorDetails, listPaginatedAvailabilities } from "@/services/availability-service"
import { Slot } from "@/types/availability"
import { formatDateTime } from "./date-utils"

export const fetchAvailableSlots = async (
  page: number = 1,
  perPage: number = 5
): Promise<Slot[]> => {
  try {
    const availabilitiesResponse = await listPaginatedAvailabilities(page, perPage)
    const slots = await Promise.all(
      availabilitiesResponse.availabilities.map(async (availability) => {
        const doctor = await getDoctorDetails(availability.doctorId)
        const { formattedDate, formattedTime } = formatDateTime(availability.availableFrom)
        return {
          id: availability.id,
          doctorId: availability.doctorId,
          doctor: doctor.name,
          date: formattedDate,
          time: formattedTime
        }
      })
    )

    return slots
  } catch (error) {
    console.error('Error fetching available slots:', error)
    return []
  }
}
