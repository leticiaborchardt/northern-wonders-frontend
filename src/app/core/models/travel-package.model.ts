import { Destination } from "./destination.model"

export interface TravelPackage {
  id?: string
  destination: Destination
  name: string
  imageUrl: string
  description: string
  hotelName: string
  airline: string
  flightNumber: string
  price: number
  startDate: Date
  endDate: Date
}