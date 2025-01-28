
import { Timestamp } from "firebase/firestore"

export interface ConfigModel {
  readonly actions: { label: string, redirectTo: string }[];
  readonly type: MessageType
  readonly messages: Message[]
}
export interface Message {
  id?: string
  message: string
  timestamp: Timestamp
  sender: string
  departments: string[],
  read: boolean
}
export enum MessageType {
  read = 'read',
  unread = 'unread'
}
