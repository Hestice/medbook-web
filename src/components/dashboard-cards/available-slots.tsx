import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'
import { Textarea } from '../ui/textarea'
import { Slot } from '@/types/availability'
import { fetchAvailableSlots } from '@/utils/doctor-availability'


export default function AvailableSlotsCard() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadSlots = async () => {
      setLoading(true)
      const fetchedSlots = await fetchAvailableSlots()
      setSlots(fetchedSlots)
      setLoading(false)
    }

    loadSlots()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  console.log(slots)

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
              <p className="text-sm text-muted-foreground">{slot.time}</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Book Now</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book an Appointment</DialogTitle>
                  <DialogDescription>Fill in the details to schedule your appointment with {slot.doctor}.</DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                  </div>
                  <div>
                    <Label htmlFor="reason">Reason for Visit</Label>
                    <Textarea id="reason" placeholder="Briefly describe your symptoms or reason for the appointment" />
                  </div>
                  <Button type="submit" className="w-full">Confirm Booking</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
