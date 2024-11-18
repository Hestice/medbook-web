'use client'

import { useState } from 'react'
import { format, parseISO, isWithinInterval, addDays } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DateRange } from "react-day-picker"
import { Appointment } from '@/types/appointment-type'
import DateRangePicker from '@/components/appointment-cards/date-range-filter'
import AppointmentCard from '@/components/appointment-cards/appointment-card'
import AppointmentPagination from '@/components/appointment-cards/appointment-pagination'
import SelectedAppointment from '@/components/appointment-cards/selected-appointment'

const ITEMS_PER_PAGE = 5

//sample data
const initialAppointments: Appointment[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Appointment ${i + 1}`,
  date: format(addDays(new Date(), i), 'yyyy-MM-dd'),
  time: `${Math.floor(Math.random() * 12 + 9)}:00`,
  doctor: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Davis'][Math.floor(Math.random() * 5)]}`,
  comments: [],
}))

export function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [newComment, setNewComment] = useState('')
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7)
  })
  const [currentPage, setCurrentPage] = useState(1)

  const handleDeleteAppointment = (id: number) => {
    setAppointments(appointments.filter((apt) => apt.id !== id))
    setSelectedAppointment(null)
  }

  const handleAddComment = () => {
    if (newComment.trim() && selectedAppointment) {
      const updatedAppointments = appointments.map((apt) =>
        apt.id === selectedAppointment.id
          ? {
              ...apt,
              comments: [
                ...apt.comments,
                { id: Date.now(), author: 'You', text: newComment },
              ],
            }
          : apt
      )
      setAppointments(updatedAppointments)
      setSelectedAppointment({
        ...selectedAppointment,
        comments: [
          ...selectedAppointment.comments,
          { id: Date.now(), author: 'You', text: newComment },
        ],
      })
      setNewComment('')
    }
  }

  const filteredAppointments = dateRange?.from && dateRange?.to
    ? appointments.filter((apt) => {
        const aptDate = parseISO(apt.date)
        return isWithinInterval(aptDate, { start: dateRange.from!, end: dateRange.to! })
      })
    : appointments

  const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE)
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="container mx-auto p-6 bg-background">
      <h1 className="text-3xl font-bold mb-6">Your Appointments</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Manage Appointments Here</CardTitle>
                <DateRangePicker dateRange={dateRange} setDateRange={setDateRange}/>
              </div>
            </CardHeader>
            <AppointmentCard paginatedAppointments={paginatedAppointments} setSelectedAppointment={setSelectedAppointment}/>
            <AppointmentPagination
              filteredAppointments={filteredAppointments}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </Card>
        </div>
        <div className="w-full md:w-1/3">
          {selectedAppointment ? (
            <SelectedAppointment
              selectedAppointment={selectedAppointment}
              newComment={newComment}
              setNewComment={setNewComment}
              handleDeleteAppointment={handleDeleteAppointment}
              handleAddComment={handleAddComment}
            />
            ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Select an appointment to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}