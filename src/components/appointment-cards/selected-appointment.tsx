import React from 'react'
import { Edit, Trash2, Send } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Appointment } from '@/types/appointment-type'

interface SelectedAppointmentProps {
  selectedAppointment: Appointment | null
  newComment: string
  setNewComment: React.Dispatch<React.SetStateAction<string>>
  handleDeleteAppointment: () => void
  handleAddComment: () => void
}

export default function SelectedAppointment({
    selectedAppointment,
    newComment,
    setNewComment,
    handleDeleteAppointment,
    handleAddComment
  }: SelectedAppointmentProps) {

    if (!selectedAppointment) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{selectedAppointment.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {selectedAppointment.date} at {selectedAppointment.time} with {selectedAppointment.doctor}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end space-x-2 mb-4">
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDeleteAppointment()}
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
    </Card>
  )
}
