import { Timestamp } from "firebase/firestore"

export interface Message {
  id?: string
  message: string
  timestamp: Timestamp
  sender: string
  departments: string[]
}
