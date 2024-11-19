import React, { useState } from 'react'
import { Edit, Trash2, Send } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Appointment } from '@/types/appointment-type'
import EditAppointmentDialog from '@/components/dialogs/edit-appointment'
import { Dialog } from '@/components/ui/dialog'
import { Slot } from '@/types/availability'
import { fetchAvailableSlots } from '@/utils/doctor-availability'

interface SelectedAppointmentProps {
  selectedAppointment: Appointment | null
  newComment: string
  setNewComment: React.Dispatch<React.SetStateAction<string>>
  handleDeleteAppointment: () => void
  handleAddComment: () => void
  onAppointmentUpdated: () => void;
}

export default function SelectedAppointment({
    selectedAppointment,
    newComment,
    setNewComment,
    handleDeleteAppointment,
    handleAddComment,
    onAppointmentUpdated
  }: SelectedAppointmentProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const loadSlots = async () => {
    setLoading(true)
    try {
      const fetchedSlots = await fetchAvailableSlots()
      setSlots(fetchedSlots)
    } catch (error) {
      console.error("Error fetching available slots:", error)
    } finally {
      setLoading(false) 
    }
  }

  const handleEditClick = async () => {
    await loadSlots()
    setEditDialogOpen(true)
  }

  if (!selectedAppointment) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>{selectedAppointment.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {selectedAppointment.date} at {selectedAppointment.time_start} with {selectedAppointment.doctor}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end space-x-2 mb-4">
          <Button variant="outline" size="sm" onClick={handleEditClick} disabled={loading}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteAppointment}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Comments</h3>
          {selectedAppointment.comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-2">
              <Avatar>
                <AvatarFallback>{comment.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{comment.author}</div>
                <div className="text-sm text-muted-foreground">{comment.text}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleAddComment}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <EditAppointmentDialog
          onClose={() => setEditDialogOpen(false)}
          appointment={selectedAppointment}
          slots={slots}
          loading={loading} 
          onAppointmentUpdated={onAppointmentUpdated} 
        />
      </Dialog>
    </Card>
  )
}
