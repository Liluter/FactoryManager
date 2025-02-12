import { inject, Injectable } from '@angular/core';
import { Message } from '../types/data.interface';
import { Auth } from '@angular/fire/auth';
import { BehaviorSubject, catchError, filter, Observable, of, tap } from 'rxjs';
import { collection, collectionData, doc, Firestore, orderBy, query, where, docData, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { Task } from '../types/task.interface';


export interface Department {
  description: string
  members: string[]
  name: string
  tabs: string[]
}
export interface MessageGr {
  id?: string
  message: string
  timestamp: any
  sender: string
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  messagesMocup: { unread: Message[], read: Message[] } = {
    unread: [
      { author: 'karol', message: 'Welcome new employers', createdAt: '12-12-2024 13:43', read: false, id: '1' },
      { author: 'karol', message: 'Welcome new employers', createdAt: '12-12-2024 13:44', read: false, id: '1' },
      { author: 'mirek', message: 'Wrong parts', createdAt: '12-12-2024 13:43', read: true, id: '2' },
      { author: 'ania', message: 'Where is projecgt of new part.', createdAt: '12-13-2024 10:43', read: false, id: '3' },
    ],
    read: [
      { author: 'karol', message: 'Welcome new employers', createdAt: '12-12-2024 13:43', read: false, id: '1' },
      { author: 'mirek', message: 'Wrong parts', createdAt: '12-12-2024 13:43', read: true, id: '2' },
      { author: 'ania', message: 'Where is projecgt of new part.', createdAt: '12-13-2024 10:43', read: false, id: '3' },
    ]
  }
  private firestore: Firestore = inject(Firestore)

  actualTab: BehaviorSubject<string> = new BehaviorSubject('')

  getMessagesForWorkshop(): Observable<MessageGr[]> {
    const groupId = '5rGeu1EDa4xsBlsz616a'
    const messagesCollection = collection(this.firestore, `groups/${groupId}/messages`)
    const q = query(messagesCollection, orderBy('timestamp'))
    return collectionData(q, { idField: 'id' }) as Observable<MessageGr[]>
  }
  getMessagesForDepartment(departId: string): Observable<MessageGr[]> {
    const groupId = departId
    const messagesCollection = collection(this.firestore, `groups/${groupId}/messages`)
    const q = query(messagesCollection, orderBy('timestamp'))
    return collectionData(q, { idField: 'id' }) as Observable<MessageGr[]>
  }
  sendMessageToWorkshop(messageText: string, sender: string) {
    const groupId = '5rGeu1EDa4xsBlsz616a'
    const messagesCollection = collection(this.firestore, `groups/${groupId}/messages`);
    addDoc(messagesCollection, { message: messageText, timestamp: serverTimestamp(), sender });
  }

  sendMessageToDepartment(departId: string, messageText: string, sender: string) {
    const groupId = departId
    const messagesCollection = collection(this.firestore, `groups/${groupId}/messages`);
    addDoc(messagesCollection, { message: messageText, timestamp: serverTimestamp(), sender });
  }
  getWorkshopDepartment(): Observable<Department> {
    const groupeId = '5rGeu1EDa4xsBlsz616a'
    const itemDoc = doc(this.firestore, 'groups/' + groupeId)
    const workshop$ = docData(itemDoc) as Observable<Department>
    return workshop$.pipe(tap((data) => console.log('group', data)))
  }

  // getDepartment(departmentId: string | undefined): Observable<Department | null> {
  //   const groupeId = departmentId
  //   if (!!groupeId) {
  //     of(null)
  //   }
  //   const itemDoc = doc(this.firestore, 'groups/' + groupeId)
  //   const workshop$ = docData(itemDoc) as Observable<Department>
  //   return workshop$.pipe(
  //     catchError(() => of(null)))
  // }
  getDepartment(departmentId: string | undefined): Observable<Department | null> {
    if (!!departmentId) {
      of(null)
    }
    const itemDoc = doc(this.firestore, 'departments/' + departmentId)
    const department$ = docData(itemDoc) as Observable<Department>
    return department$.pipe(
      catchError(() => of(null)))
  }

  // console.log('getloggoedInUser()', this.auth.currentUser)
  // const userCollection = collection(this.firestore, 'users');
  // const userAuth$: Observable<User> = user(this.auth)
  // if (this.loggedFSUser) {
  //   return this.loggedFSUser
  // } else {
  //   this.userFS$ = userAuth$.pipe(
  //     switchMap((user) => {
  //       if (user) {
  //         return docData(doc(this.firestore, 'users/' + user.uid), { idField: 'id' }) as Observable<FSUser | null>
  //       } else {
  //         return of(null)
  //       }
  //     }
  //     ),
  //     tap(user => {
  //       this.loggedFSUser = user
  //       // this.userSubject.next(user)
  //     })
  //   )
  //   return this.loggedFSUser
  // }


  // generyczne funkje utworzyć dla róznych dział

}
