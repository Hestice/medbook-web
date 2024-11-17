'use client'

import { useState } from 'react'
<<<<<<< Updated upstream
import { PlusCircleIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { upcomingAppointments } from '@/constants/appointments'
import { availableSlots } from '@/constants/availableSlots'
import { formatDate } from '@/utils/date-utils'
=======
import UpcomingAppointmentsCard from './dashboard-cards/upcoming-appointments'
import AvailableSlotsCard from './dashboard-cards/available-slots'
import BookAppointmentCard from './dashboard-cards/book-appointment'
import GetCurrentUser from '@/hooks/use-current-user'
>>>>>>> Stashed changes

export function DashboardComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date())  

  const userWithAbilities = GetCurrentUser()
  console.log(userWithAbilities)
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Welcome back! Let&apos;s take care of your health.</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Upcoming Appointments</CardTitle>
          <CardDescription>Here&apos;s what&apos;s coming up on your schedule</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${appointment.doctor}`} />
                <AvatarFallback>{appointment.doctor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="font-medium">{appointment.doctor}</p>
                <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatDate(appointment.date)}</p>
                <p className="text-sm text-muted-foreground">{appointment.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Appointment Slots</CardTitle>
          <CardDescription>Quick and easy booking for your next visit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {availableSlots.map((slot) => (
            <div key={slot.id} className="flex items-center space-x-4">
              <div className="flex-grow">
                <p className="font-medium">{slot.doctor}</p>
                <p className="text-sm text-muted-foreground">{slot.specialty}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatDate(slot.date)}</p>
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

      <Card>
        <CardHeader>
          <CardTitle>Book a New Appointment</CardTitle>
          <CardDescription>Choose a date and find available slots</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <div className="flex-grow space-y-4">
              <div>
                <Label htmlFor="specialty">Select Specialty</Label>
                <Select>
                  <SelectTrigger id="specialty">
                    <SelectValue placeholder="Choose a specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Practice</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="doctor">Select Doctor</Label>
                <Select>
                  <SelectTrigger id="doctor">
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smith">Dr. Smith</SelectItem>
                    <SelectItem value="johnson">Dr. Johnson</SelectItem>
                    <SelectItem value="brown">Dr. Brown</SelectItem>
                    <SelectItem value="davis">Dr. Davis</SelectItem>
                    <SelectItem value="wilson">Dr. Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">
                <PlusCircleIcon className="mr-2 h-4 w-4" /> Find Available Slots
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}