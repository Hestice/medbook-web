import { Role } from '@/enums/role'

export interface User {
  uuid: string
  name: string
  email: string
  role: Role
}
