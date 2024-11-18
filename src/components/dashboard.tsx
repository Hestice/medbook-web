'use client'

import { useState } from 'react'
import UpcomingAppointmentsCard from '@/components/dashboard-cards/upcoming-appointments'
import AvailableSlotsCard from '@/components/dashboard-cards/available-slots'
import BookAppointmentCard from '@/components/dashboard-cards/book-appointment'
import { useCurrentUser } from '@/hooks/use-current-user'
import { WeeklyAvailabilitySchedulerComponent } from '@/components/weekly-availability-scheduler'
import { Role } from '@/enums/role'

export function DashboardComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date())  

  const { user, loading } = useCurrentUser()
  if (loading) return <div className='items-center justify-center'>Loading...</div>

  const name = user?.name

  const isDoctor = user?.role === Role.Doctor
  const isPatient = user?.role === Role.Patient

  const renderPatientDashboard = () => (
    <>
      <UpcomingAppointmentsCard role={user?.role}/>
      <AvailableSlotsCard />
      <BookAppointmentCard date={date} setDate={setDate} />
    </>
  )

  const renderDoctorDashboard = () => (
    <>
      <UpcomingAppointmentsCard role={user?.role} />
      <WeeklyAvailabilitySchedulerComponent />
    </>
  )

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="items-start">
        <h1 className="text-3xl font-bold text-primary">Welcome back, {name}!</h1>
        <p className="text-md font-normal text-zinc-400">Let&apos;s take care of your health.</p>
      </div>
      {isDoctor && renderDoctorDashboard()}
      {isPatient && renderPatientDashboard()}
    </div>
  )
}
