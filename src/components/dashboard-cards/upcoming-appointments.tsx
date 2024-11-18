import { upcomingAppointments } from '@/constants/appointments'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDate } from '@/utils/date-utils'
import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'
import { Role } from '@/enums/role'

interface UpcomingAppointmentsProps {
  role? : Role
}

export default function UpcomingAppointmentsCard({role}: UpcomingAppointmentsProps) {
  const userRole = role
  return (
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
  )
}
