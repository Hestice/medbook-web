import React from 'react'
import { Dialog, DialogTitle, DialogDescription, DialogFooter, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface DeleteConfirmationProps {
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
  handleDelete: () => void
}

export default function DeleteConfirmation({ dialogOpen, setDialogOpen, handleDelete }: DeleteConfirmationProps) {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this appointment? This action cannot be undone.
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setDialogOpen(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete()
              setDialogOpen(false)
            }}
            className="bg-destructive text-white"
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
