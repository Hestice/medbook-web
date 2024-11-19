import React, { useEffect, useState } from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'
import { Slot } from '@/types/availability'
import { fetchAvailableSlots } from '@/utils/doctor-availability'
import BookAppointmentDialog from '../dialogs/book-appointment'
import { useCurrentUser } from '@/hooks/use-current-user'

export default function AvailableSlotsCard() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { user } = useCurrentUser()
  const [dialogStates, setDialogStates] = useState<{ [key: string]: boolean }>({})

  const loadSlots = async () => {
    setLoading(true)
    const fetchedSlots = await fetchAvailableSlots()
    setSlots(fetchedSlots)
    setLoading(false)
  }

  useEffect(() => {
    loadSlots()
  }, [])

  const handleAppointmentBooked = () => {
    loadSlots()
  }

  const toggleDialog = (slotId: string) => {
    setDialogStates(prevStates => ({
      ...prevStates,
      [slotId]: !prevStates[slotId],
    }))
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Appointment Slots</CardTitle>
        <CardDescription>Quick and easy booking for your next visit</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {slots.map((slot) => (
          <div key={slot.id} className="flex items-center space-x-4">
            <div className="flex-grow">
              <p className="font-medium">Dr. {slot.doctor}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{slot.date}</p>
              <p className="text-sm text-muted-foreground">{slot.timeFrom}</p>
            </div>
            <Dialog open={dialogStates[slot.id] || false} onOpenChange={() => toggleDialog(slot.id)}>
              <DialogTrigger asChild>
                <Button variant="outline">Book Now</Button>
              </DialogTrigger>
              {user && <BookAppointmentDialog slot={slot} user={user} onAppointmentBooked={handleAppointmentBooked} />}
            </Dialog>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
