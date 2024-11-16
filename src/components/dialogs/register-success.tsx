import React from 'react'
import { Dialog, DialogTitle, DialogDescription, DialogFooter, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface RegisterSuccessProps {
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
  setShowLogin: (show: boolean) => void
  setIsExistingUser: (show: boolean) => void
}

export default function RegisterSuccess({ dialogOpen, setDialogOpen, setShowLogin, setIsExistingUser }: RegisterSuccessProps) {
  return (
    
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Registration Successful!</DialogTitle>
        <DialogDescription>
          Your account has been created successfully. You can now log in with your credentials.
        </DialogDescription>
        <DialogFooter>
          <Button
            onClick={() => {
              setDialogOpen(false)
              setShowLogin(true)
              setIsExistingUser(true)
            }}
          >
            Continue to Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
