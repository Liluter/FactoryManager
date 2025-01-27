import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addDoc, collection, collectionData, Firestore, orderBy, query, serverTimestamp, where } from '@angular/fire/firestore';
import { Message } from '../types/message.interface';

export enum MessageType {
  read = 'read',
  unread = 'unread'
}
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private firestore: Firestore = inject(Firestore)

  getMessagesForDepartment(department: string): Observable<Message[]> {
    const messagesCollection = collection(this.firestore, 'messages')
    const q = query(messagesCollection, where('departments', 'array-contains', department), orderBy('timestamp'))
    return collectionData(q, { idField: 'id' }) as Observable<Message[]>
  }
  getAll(): Observable<Message[]> {
    const messagesCollection = collection(this.firestore, 'messages')
    // const q = query(messagesCollection, where('departments', 'array-contains', department), orderBy('timestamp'))
    return collectionData(messagesCollection, { idField: 'id' }) as Observable<Message[]>
  }
  async sendMessage(messageText: string, sender: string, departments: string[]): Promise<void> {

    const messagesCollection = collection(this.firestore, `messages`);
    addDoc(messagesCollection, { message: messageText, timestamp: serverTimestamp(), sender, departments });
  }
}


