import React, { useEffect, useState } from 'react';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { ArrowRight } from 'lucide-react';
import { convertDateToISO, convertTo24HourFormat, formatDateForForm, formatReadableDate } from '@/utils/date-utils';
import { Appointment } from '@/types/appointment-type';
import { updateAppointment } from '@/services/appointment-service';
import { bookAppointmentSchema, EditAppointmentFormValues } from '@/schema/book-appointment';
import { Slot } from '@/types/availability';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { editAppointmentPayload } from '@/constants/appointments';

interface EditAppointmentDialogProps {
  appointment: Appointment;
  onClose: () => void;
  slots: Slot[];
  loading: boolean;
}

export default function EditAppointmentDialog({
  appointment,
  onClose,
  slots,
  loading
}: EditAppointmentDialogProps) {
  const [readableDate, setReadableDate] = useState(appointment.date);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedAvailabilityId, setSelectedAvailabilityId] = useState<string | null>(null);
  const form = useForm({
    resolver: zodResolver(bookAppointmentSchema),
    defaultValues: {
      name: appointment.patient_name,
      date: convertDateToISO(appointment.date),
      from: convertTo24HourFormat(appointment.time_start),
      to: convertTo24HourFormat(appointment.time_end),
      comment: appointment.comments[0]?.text || '',
    },
  });

  useEffect(() => {
    const dates = Array.from(new Set([formatReadableDate(appointment.date), ...slots.map(slot => slot.date)]));
    setAvailableDates(dates);
    const initialDate = appointment.date;
    const availableSlot = slots.filter(slot => slot.date === initialDate);
    setAvailableTimes(availableSlot.map(slot => slot.timeFrom));
    form.setValue('from', convertTo24HourFormat(appointment.time_start));
    form.setValue('to', convertTo24HourFormat(appointment.time_end));
  }, [appointment, slots, form]);

  const handleDateChange = (date: string) => {
    setReadableDate(date);
    const matchingSlots = slots.filter(slot => slot.date === date);
    setAvailableTimes(matchingSlots.map(slot => slot.timeFrom));
    if (matchingSlots.length > 0) {
      setSelectedAvailabilityId(matchingSlots[0].id);
      form.setValue('from', convertTo24HourFormat(matchingSlots[0].timeFrom))
      form.setValue('to', convertTo24HourFormat(matchingSlots[0].timeTo))
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'from' | 'to') => {
    form.setValue(field, e.target.value);
  };

  const onSubmit = async (values: EditAppointmentFormValues) => {
    const payload = editAppointmentPayload(values);

    if (selectedAvailabilityId && selectedAvailabilityId !== appointment.availability_id) {
      payload.availabilityId = selectedAvailabilityId; 
    }
    try {
      const response = await updateAppointment(appointment.id, payload);
      console.log('Appointment updated successfully', response);
      onClose();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const renderEditAppointmentForm = () => (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder={appointment.patient_name} {...field} />
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
                <Select
                  {...field}
                  value={field.value || formatReadableDate(appointment.date)}
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleDateChange(formatReadableDate(value));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available Dates</SelectLabel>
                      {availableDates.map(date => (
                        <SelectItem key={date} value={formatDateForForm(date)}> 
                          {date}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                  placeholder="Select time"
                  {...field}
                  onChange={(e) => handleTimeChange(e, 'from')}
                  disabled={availableTimes.length === 0}
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
                  placeholder="Select time"
                  {...field}
                  onChange={(e) => handleTimeChange(e, 'to')}
                  disabled={availableTimes.length === 0}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormDescription>Pick a time between {appointment.time_start} and {appointment.time_end}</FormDescription>

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

        <Button type="submit" className="w-full" disabled={loading}>
          Confirm Update <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </FormProvider>
  );

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogDescription>Update the details of your appointment with {appointment.doctor}.</DialogDescription>
      </DialogHeader>
      {renderEditAppointmentForm()}
    </DialogContent>
  );
}
