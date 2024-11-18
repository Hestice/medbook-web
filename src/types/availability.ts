export interface Availability {
  id?: string;
  doctorId: string
  availableFrom: string
  availableTo: string
}
export interface Doctor {
  uuid: string
  name: string
}
export interface Slot {
  id: string
  doctor: string
  date: string
  timeFrom: string
  timeTo: string
}
