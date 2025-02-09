
import { FieldValue } from "@angular/fire/firestore";
import { Timestamp } from "firebase/firestore"

export interface MessageModel {
  title: string
  message: string
  departments: string[]
  recipients?: string[]
  sender: string
  senderId: string
  readBy: string[]
  timestamp?: FieldValue
}

export interface ConfigModel {
  readonly actions: { label: string, redirectTo: string }[];
  readonly type: MessageType
  readonly messages: Message[]
}
export interface Message {
  id?: string
  title: string
  message: string
  departments: string[]
  recipients?: string[]
  sender: string
  senderId?: string
  favourite?: boolean
  readBy: string[]
  timestamp: Timestamp
}
export enum MessageType {
  read = 'read',
  unread = 'unread'
}
