import React from 'react'
import { PlusCircleIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { pastDates } from '@/utils/date-utils'

interface BookAppointmentInterface {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

export default function BookAppointmentCard({ date, setDate }: BookAppointmentInterface) {

  return (
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
                onSelect={(selectedDate) => {
                  if (selectedDate) {
                    setDate(selectedDate)
                  }
                }}
                className="rounded-md border"
                disabled={pastDates}
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
  )
}
