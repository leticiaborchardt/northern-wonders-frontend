import { User } from "./user.model"

export interface Customer {
  id?: string
  name: string
  phone: string 
  birthDate: Date
  documentNumber: string
  address: string
  user: User
}

export interface NewCustomerUser {
  user: User,
  customer: Customer
}