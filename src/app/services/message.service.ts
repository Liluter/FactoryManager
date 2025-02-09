import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { addDoc, arrayRemove, arrayUnion, collection, collectionCount, collectionData, deleteDoc, doc, docData, DocumentData, DocumentReference, FieldValue, Firestore, getDoc, orderBy, query, serverTimestamp, updateDoc, where } from '@angular/fire/firestore';
import { Message, MessageModel } from '../types/message.interface';
import { FormResetEvent } from '@angular/forms';
import { UserService } from './user.service';




@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private firestore: Firestore = inject(Firestore)
  private userService = inject(UserService)

  getMessagesForDepartment(department: string | undefined): Observable<Message[]> {
    if (!department) {
      return of([])
    }
    const messagesCollection = collection(this.firestore, 'messages')
    const q = query(messagesCollection, where('departments', 'array-contains', department), orderBy('timestamp'))
    return collectionData(q, { idField: 'id' }) as Observable<Message[]>
  }
  getMessagesForUser(user: string | undefined): Observable<Message[]> {
    if (!user) {
      return of([])
    }
    const messagesCollection = collection(this.firestore, 'messages')
    const q = query(messagesCollection, where('recipients', 'array-contains', user))
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

  toggleFavourite(messageId: string, value: boolean) {
    const messageRef = doc(this.firestore, 'messages', messageId)
    const updatedData = { favourite: value }
    updateDoc(messageRef, updatedData)
      .then(() => console.log('Message updated'))
      .catch(error => console.log('Error has occurre :', error))
  }
  toggleRead(messageId: string, value: boolean) {
    const userId = this.userService.loggedFSUser.getValue()?.workerId
    if (!userId) {
      console.log("No user ID")
      return;
    }
    const messageRef = doc(this.firestore, 'messages', messageId)
    if (value) {
      updateDoc(messageRef, { readBy: arrayUnion(userId) })
        .then(() => console.log('Message marked as read'))
        .catch((error) => console.log('Error updating messages', error))
    } else {
      updateDoc(messageRef, { readBy: arrayRemove(userId) })
        .then(() => console.log('Message marked as unread'))
        .catch((error) => console.log('Error updating document', error))
    }
  }
  isRead(messageId: string) {
    const userId = this.userService.loggedFSUser.getValue()?.workerId
    const messageRef = doc(this.firestore, 'messages', messageId)

    const isRead = docData(messageRef, { idField: 'id' }) as Observable<Message | undefined>
    if (userId) {
      return isRead.pipe(
        map(message => message?.readBy.includes(userId)),
      )
    }
    return of(undefined)
  }
  delete(messageId: string) {
    const messageRef = doc(this.firestore, 'messages', messageId)
    deleteDoc(messageRef)
      .then(() => console.log('Message deleted'))
      .catch(error => console.log('Error has occurre durig deletion process :', error))
  }
}


