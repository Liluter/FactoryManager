import { inject, Injectable } from '@angular/core';
import { Message } from '../types/data.interface';
import { Auth } from '@angular/fire/auth';
import { Observable, of, tap } from 'rxjs';
import firebase from 'firebase/compat/app';
import { collection, collectionData, doc, Firestore, orderBy, query, where, docData, addDoc, serverTimestamp } from '@angular/fire/firestore';

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
export interface Task {
  id?: string
  name: string
  description: string
  files: string[]
  active: boolean
  timestamp: any
  started?: string
  priority: 0 | 1 | 2 | 3,
  contractors: string[]
}

interface Contractor {
  id: string,
  name: string
}
export interface TaskWithContractorNames extends Task {
  contractorNames: string[]
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



  // getMessageForGroup(groupeId: string): Observable<MessageGr[]> {
  //   const messagesCollection = collection(this.firestore, `groups/${groupeId}/messages`)
  //   const q = query(messagesCollection, orderBy('timestamp'))
  //   return collectionData(q, { idField: 'id' }) as Observable<MessageGr[]>
  // }
  getActiveTasksForWorkshop(): Observable<Task[]> {
    const groupId = '5rGeu1EDa4xsBlsz616a'
    const tasksCollection = collection(this.firestore, `groups/${groupId}/tasks`)
    const q = query(tasksCollection, where('active', "==", true), orderBy('priority'))
    return collectionData(q, { idField: 'id' }) as Observable<Task[]>
  }
  getActiveTasksForDepartment(departId: string): Observable<Task[]> {
    const groupId = departId
    const tasksCollection = collection(this.firestore, `groups/${groupId}/tasks`)
    const q = query(tasksCollection, where('active', "==", true), orderBy('priority'))
    return collectionData(q, { idField: 'id' }) as Observable<Task[]>
  }
  getOneActiveTask(id: string | undefined): Observable<Task | undefined> {
    const groupId = '5rGeu1EDa4xsBlsz616a'
    console.log('task id:', id)
    if (id) {
      const taskRef = doc(this.firestore, `groups/${groupId}/tasks`, id)
      console.log('taskRef', taskRef)
      return docData(taskRef) as Observable<Task>
    }
    return of(undefined)
  }
  getOneActiveTaskForDepartment(id: string | undefined, departId: string): Observable<Task | undefined> {
    const groupId = departId
    console.log('task id:', id)
    if (id) {
      const taskRef = doc(this.firestore, `groups/${groupId}/tasks`, id)
      console.log('taskRef', taskRef)
      return docData(taskRef) as Observable<Task>
    }
    return of(undefined)
  }

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

  getDepartment(departmetId: string): Observable<Department> {
    const groupeId = departmetId
    const itemDoc = doc(this.firestore, 'groups/' + groupeId)
    const workshop$ = docData(itemDoc) as Observable<Department>
    return workshop$.pipe(tap((data) => console.log('group', data)))
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
