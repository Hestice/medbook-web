'use client'

import { useState } from 'react'
import UpcomingAppointmentsCard from './dashboard-cards/upcoming-appointments'
import AvailableSlotsCard from './dashboard-cards/available-slots'
import BookAppointmentCard from './dashboard-cards/book-appointment'
import { useCurrentUser } from '@/hooks/use-current-user'

export function DashboardComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date())  

  const { user, loading } = useCurrentUser()
  console.log(user)
  if (loading) return <div className='items-center justify-center'>Loading...</div>

  const name = user?.name

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="items-start">
        <h1 className="text-3xl font-bold text-primary">Welcome back, {name}!</h1>
        <p className="text-md font-normal text-zinc-400"> Let&apos;s take care of your health.</p>
      </div>
      <UpcomingAppointmentsCard/>
      <AvailableSlotsCard/>
      <BookAppointmentCard date={date} setDate={setDate}/>
    </div>
  )
}