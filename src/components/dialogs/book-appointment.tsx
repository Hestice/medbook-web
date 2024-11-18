import React, { useEffect, useState } from 'react'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Slot } from '@/types/availability'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { bookAppointmentSchema } from '@/schema/book-appointment'
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { ArrowRight } from 'lucide-react'
import { convertDateToISO, convertTo24HourFormat, formatReadableDate } from '@/utils/date-utils'
import { User } from '@/types/user'
import { buildPayload } from '@/constants/appointments'
import { bookAppointment } from '@/services/appointment-service'

interface BookAppointmentDialogProps {
  slot: Slot
  user: User
  onAppointmentBooked: () => void
}

export default function BookAppointmentDialog({ slot, user, onAppointmentBooked }: BookAppointmentDialogProps) {
  const name = user?.name
  const [readableDate, setReadableDate] = useState(formatReadableDate(slot.date))

  const form = useForm<z.infer<typeof bookAppointmentSchema>>({
    resolver: zodResolver(bookAppointmentSchema),
    defaultValues: {
      name: name, 
      date: convertDateToISO(slot.date),
      from: convertTo24HourFormat(slot.timeFrom),
      to: convertTo24HourFormat(slot.timeTo),  
    },
  })

  useEffect(() => {
    form.setValue('from', convertTo24HourFormat(slot.timeFrom))
    form.setValue('to', convertTo24HourFormat(slot.timeTo))
  }, [slot, form]);

  const handleDateChange = (date: string) => {
    setReadableDate(formatReadableDate(date));
  }

  async function onSubmit(values: z.infer<typeof bookAppointmentSchema>) {
    const payload = buildPayload(values, slot, user);
    console.log(payload);

    try {
      const response = await bookAppointment(payload);
      console.log('Appointment booked successfully:', response);
      onAppointmentBooked()
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  }
  
  const renderBookAppointmentForm = () => (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder={name} {...field} />
              </FormControl>
              <FormDescription>What is your name?</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="date" render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Date</FormLabel>
              <div className="flex flex-row gap-2 items-center justify-start">
                <FormControl className='w-fit'>
                    <Input
                      type="date" 
                      placeholder="Select date"
                      {...field}
                      disabled={!!slot.date}
                      onChange={(e) => {
                        field.onChange(e);
                        handleDateChange(e.target.value);
                      }}
                    />
                </FormControl>
                <FormDescription>{readableDate}</FormDescription> 
              </div>
              
              <FormMessage />
            </FormItem>
          )} />

          <div className="flex flex-row justify-start gap-4">
            <FormField control={form.control} name="from" render={({ field }) => (
              <FormItem className='flex flex-row gap-2 items-center'>
                <FormLabel>From</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    min={convertTo24HourFormat(slot.timeFrom)}
                    max={convertTo24HourFormat(slot.timeTo)} 
                    placeholder="Select time"
                    {...field}
                  />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="to" render={({ field }) => (
              <FormItem className='flex flex-row gap-2 items-center'>
                <FormLabel>To</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    min={convertTo24HourFormat(slot.timeFrom)}
                    max={convertTo24HourFormat(slot.timeTo)} 
                    placeholder="Select time"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormDescription>Pick a time between {slot.timeFrom} and {slot.timeTo}</FormDescription>

          <FormField control={form.control} name="comment" render={({ field }) => (
            <FormItem>
              <FormLabel>Reasons for Visit</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your visit" {...field} />
              </FormControl>
              <FormDescription>Please explain your reason for the visit.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <Button type="submit" className="w-full">
            Confirm Booking <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </FormProvider>
    </>
  )

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Book an Appointment</DialogTitle>
        <DialogDescription>Fill in the details to schedule your appointment with {slot.doctor}.</DialogDescription>
      </DialogHeader>
      {renderBookAppointmentForm()}
    </DialogContent>
  )
}
