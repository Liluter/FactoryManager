import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { addDoc, collection, collectionCount, collectionData, doc, docData, Firestore, getDoc, orderBy, query, serverTimestamp, where } from '@angular/fire/firestore';
import { Message } from '../types/message.interface';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private firestore: Firestore = inject(Firestore)

  getMessagesForDepartment(department: string | undefined): Observable<Message[]> {
    if (!department) {
      return of([])
    }
    const messagesCollection = collection(this.firestore, 'messages')
    const q = query(messagesCollection, where('departments', 'array-contains', department), orderBy('timestamp'))
    return collectionData(q, { idField: 'id' }) as Observable<Message[]>
  }

  getMessageCountForDepartment(department: string | undefined): Observable<number> {
    if (!department) {
      return of(0)
    }
    const messagesCollection = collection(this.firestore, 'messages')
    const q = query(messagesCollection, where('departments', 'array-contains', department))
    // return collectionData(q, { idField: 'id' }) as Observable<Message[]>
    return collectionCount(q) as Observable<number>
  }
  getOne(id: string): Observable<Message | undefined> {
    const messageRef = doc(this.firestore, 'messages', id)

    return docData(messageRef, { idField: 'id' }) as Observable<Message | undefined>
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


