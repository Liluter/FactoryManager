import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { addDoc, collection, collectionCount, collectionData, doc, docData, DocumentReference, FieldValue, Firestore, getDoc, orderBy, query, serverTimestamp, where } from '@angular/fire/firestore';
import { Message } from '../types/message.interface';

export interface MessageModel {
  title: string,
  message: string,
  departments: string[],
  reciver?: string,
  sender: string,
  senderId: string,
  read: boolean,
  timestamp?: FieldValue
}



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
  async sendMessage(message: MessageModel): Promise<DocumentReference> {

    const messagesCollection = collection(this.firestore, `messages`);
    try {
      const docRef = await addDoc(messagesCollection, message)
      console.log('Message writen to database wit id: ', docRef.id)
      return docRef
    }
    catch (err: any) {
      console.log("Something went wrong", err.message)
      throw err
    }
  }
}


