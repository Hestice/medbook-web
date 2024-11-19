import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDate } from '@/utils/date-utils'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'
import { Appointment } from '@/types/appointment-type'
import { listAppointments } from '@/services/appointment-service'
import { Role } from '@/enums/role'

const mockSpecialties = [
  'Cardiologist',
  'Dermatologist',
  'Orthopedist',
  'Neurologist',
  'Pediatrician'
]

interface AppointmentWithSpecialty extends Appointment {
  specialty: string;
}

interface UpcomingAppointmentsProps {
  role? : Role
}
export default function UpcomingAppointmentsCard({}: UpcomingAppointmentsProps) {
  const [appointments, setAppointments] = useState<AppointmentWithSpecialty[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      try {
        setLoading(true)
        const fetchedAppointments = await listAppointments(undefined, 5)

        const upcomingAppointments = fetchedAppointments.slice(0, 5).map((appointment, index) => ({
          ...appointment,
          specialty: mockSpecialties[index % mockSpecialties.length]
        }))

        setAppointments(upcomingAppointments)
      } catch (error) {
        setError('Error fetching upcoming appointments.')
        console.error('Error fetching appointments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUpcomingAppointments()
  }, [])

  if (loading) {
    return <Card><CardContent>Loading upcoming appointments...</CardContent></Card>
  }

  if (error) {
    return <Card><CardContent>{error}</CardContent></Card>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Upcoming Appointments</CardTitle>
        <CardDescription>Here&apos;s what&apos;s coming up on your schedule</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
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
                <p className="text-sm text-muted-foreground">{appointment.time_start}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </CardContent>
    </Card>
  )
}
