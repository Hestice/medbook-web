import React from 'react'
import { CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Appointment } from '@/types/appointment-type';

interface AppointmentPaginationProps {
  filteredAppointments: Appointment[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function AppointmentPagination({
  filteredAppointments,
  currentPage,
  totalPages,
  setCurrentPage,
}: AppointmentPaginationProps) {
  return (
    <CardFooter>
      {filteredAppointments.length > 0 && (
        <div className="flex items-center justify-between w-full space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </CardFooter>
)
}
