import { listAvailabilities } from "@/services/availability-service";
import { CalendarEvent } from "@/types/calendar-event";
import { convertToDate } from "@/utils/date-utils";

export const populateScheduler = async (): Promise<CalendarEvent[]> => {
  try {
    const availabilities = await listAvailabilities();
    const mappedEvents = availabilities.map((availability) => {
      return {
        start: convertToDate(availability.availableFrom),
        end: convertToDate(availability.availableTo),
        title: 'Available',
        availability_id: availability.id
      };
    });
    return mappedEvents;
  } catch (error) {
    console.error('Error fetching and populating events:', error);
    return []
  }
};