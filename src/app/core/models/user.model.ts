import { UserRole } from "./user-role";

export interface User {
  id?: string
  login: string
  password: string
  role: UserRole
}