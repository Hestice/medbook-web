import React, { useState, useCallback, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Info, Save, X } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useCurrentUser } from '@/hooks/use-current-user'
import { Role } from '@/enums/role'
import { createAvailabilities } from '@/services/availability-service'
import { populateScheduler } from '@/hooks/populate-scheduler'
import { CalendarEvent } from '@/types/calendar-event'

moment.locale('en-GB')
const localizer = momentLocalizer(moment)

const DnDCalendar = withDragAndDrop<CalendarEvent>(Calendar<CalendarEvent>)


export function WeeklyAvailabilitySchedulerComponent() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [originalEvents, setOriginalEvents] = useState<CalendarEvent[]>([])
  const [hasChanges, setHasChanges] = useState(false)

  const { user } = useCurrentUser()
  const doctorId = user?.role === Role.Doctor ? user.uuid : null

  useEffect(() => {
    populateScheduler({setOriginalEvents})
  }, []);

  useEffect(() => {
    setHasChanges(JSON.stringify(events) !== JSON.stringify(originalEvents))
  }, [events, originalEvents])

  const handleSelect = useCallback(
    ({ start, end }: { start: Date | string, end: Date | string }) => {
      const title = 'Available'
      const newEvent: CalendarEvent = { start, end, title }
      setEvents([...events, newEvent])
    },
    [events]
  )

  const onEventResize = useCallback(
    ({ event, start, end }: { event: CalendarEvent, start: Date | string, end: Date | string }) => {
      setEvents(
        events.map((item) =>
          item === event ? { ...item, start, end } : item
        )
      )
    },
    [events]
  )

  const onEventDrop = useCallback(
    ({ event, start, end }: { event: CalendarEvent, start: Date | string, end: Date | string }) => {
      setEvents(
        events.map((item) =>
          item === event ? { ...item, start, end } : item
        )
      )
    },
    [events]
  )

  const removeEvent = useCallback(
    (eventToRemove: CalendarEvent) => {
      setEvents(events.filter(event =>
        event.start !== eventToRemove.start || event.end !== eventToRemove.end
      ))
    },
    [events]
  )

  const handleSave = () => {
    const availabilityData = events.map(event => ({
      doctorId: doctorId ? doctorId : "",
      availableFrom: moment(event.start).format('YYYY-MM-DD HH:mm:ss'),
      availableTo: moment(event.end).format('YYYY-MM-DD HH:mm:ss'),
    }))
    console.log(availabilityData)
    createAvailabilities(availabilityData)
      .then(() => {
        setOriginalEvents(events)
        setHasChanges(false)
        toast({
          title: 'Availability saved',
          description: 'Your weekly schedule has been updated.',
        })
      })
      .catch((error) => {
        toast({
          title: 'Error saving availability',
          description: 'There was an issue saving your availability.',
          variant: 'destructive',
        })
        console.error('Error creating availabilities:', error)
      })
  }

  const handleDiscard = () => {
    setEvents(originalEvents)
    setHasChanges(false)
    toast({
      title: "Changes discarded",
      description: "Your availability has been reset to the last saved state.",
      variant: "destructive",
    })
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-primary">Set Your Weekly Availability</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Calendar usage info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Drag on empty slots to create availability.</p>
                <p>Drag existing slots to move them.</p>
                <p>Click on a slot to remove it.</p>
                <p>Remember to save your changes!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-muted-foreground">Set your recurring weekly availability for appointments.</p>
      </CardHeader>
      <CardContent>
        <DnDCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleSelect}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          resizable
          selectable
          defaultView="week"
          views={['week']}
          dayPropGetter={(date) => {
            if (date.getDay() === 0) {
              return {
                style: {
                  display: 'none',
                }
              }
            }
            return {}
          }}
          step={30}
          timeslots={2}
          min={moment().hour(9).minute(0).toDate()}
          max={moment().hour(17).minute(0).toDate()}
          onSelectEvent={removeEvent}
          dayLayoutAlgorithm="no-overlap"
          className="h-[600px]"
          toolbar={false}
          formats={{
            dayFormat: 'ddd',
          }}
        />
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={handleDiscard}
          disabled={!hasChanges}
        >
          <X className="mr-2 h-4 w-4" /> Discard Changes
        </Button>
        <Button
          onClick={handleSave}
          disabled={!hasChanges}
        >
          <Save className="mr-2 h-4 w-4" /> Save Availability
        </Button>
      </CardFooter>
    </Card>
  )
}
