'use client'

import { useState } from 'react'
import UpcomingAppointmentsCard from './dashboard-cards/upcoming-appointments'
import AvailableSlotsCard from './dashboard-cards/available-slots'
import BookAppointmentCard from './dashboard-cards/book-appointment'

export function DashboardComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Welcome back! Let&apos;s take care of your health.</h1>
      <UpcomingAppointmentsCard/>
      <AvailableSlotsCard/>
      <BookAppointmentCard date={date} setDate={setDate}/>
    </div>
  )
}