import { listAvailabilities } from "@/services/availability-service";
import { CalendarEvent } from "@/types/calendar-event";
import { convertToDate } from "@/utils/date-utils";

interface PopulateSchedulerInterface {
  setOriginalEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>
}

export const populateScheduler = async ({ setOriginalEvents }: PopulateSchedulerInterface) => {
  try {
    const availabilities = await listAvailabilities();
    const mappedEvents = availabilities.map((availability) => {
      return {
        start: convertToDate(availability.availableFrom),
        end: convertToDate(availability.availableTo),
        title: 'Available',
      };
    });
    setOriginalEvents(mappedEvents);
  } catch (error) {
    console.error('Error fetching and populating events:', error);
  }
};