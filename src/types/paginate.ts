export interface PaginatedResponse<T> {
  total: number
  page: number
  per_page: number
  availabilities: T[]
}