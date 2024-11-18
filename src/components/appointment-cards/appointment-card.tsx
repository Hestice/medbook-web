import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Appointment } from '@/types/appointment-type'

interface appointmentCardProps {
  paginatedAppointments: Appointment[]
  setSelectedAppointment: (appointment: Appointment) => void; 
}
export default function AppointmentCard( {paginatedAppointments, setSelectedAppointment} : appointmentCardProps) {
  return (
    <CardContent>
      <div className="space-y-4">
        {paginatedAppointments.map((apt) => (
          <Card key={apt.id} className="cursor-pointer hover:bg-accent" onClick={() => setSelectedAppointment(apt)}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{apt.title}</CardTitle>
                <span className="text-sm text-muted-foreground">{apt.date} at {apt.time}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">With {apt.doctor}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </CardContent>
  )
}
