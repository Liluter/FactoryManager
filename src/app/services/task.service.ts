import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, orderBy, query, where, docData, addDoc, serverTimestamp, updateDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Task } from '../types/task.interface';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private firestore: Firestore = inject(Firestore)

  getActiveTasksForDepartment(department: string): Observable<Task[]> {
    // const groupId = '5rGeu1EDa4xsBlsz616a'
    const tasksCollection = collection(this.firestore, 'tasks')
    const q = query(tasksCollection, where('department', "==", department), where('active', "==", true), orderBy('priority'))
    return collectionData(q, { idField: 'id' }) as Observable<Task[]>
  }
  // getActiveTasksForDepartment(departId: string): Observable<Task[]> {
  //   const groupId = departId
  //   const tasksCollection = collection(this.firestore, `groups/${groupId}/tasks`)
  //   const q = query(tasksCollection, where('active', "==", true), orderBy('priority'))
  //   return collectionData(q, { idField: 'id' }) as Observable<Task[]>
  // }
  // getOneActiveTask(id: string | undefined): Observable<Task | undefined> {
  //   const groupId = '5rGeu1EDa4xsBlsz616a'
  //   if (id) {
  //     const taskRef = doc(this.firestore, `groups/${groupId}/tasks`, id)
  //     return docData(taskRef) as Observable<Task>
  //   }
  //   return of(undefined)
  // }
  getOne(id: string | undefined): Observable<Task | undefined> {
    console.log('task id:', id)
    if (id) {
      const taskRef = doc(this.firestore, 'tasks/' + id)
      return docData(taskRef, { idField: 'id' }) as Observable<Task>
    }
    return of(undefined)
  }
  updateStep(taskId: string, data: [string, boolean]) {
    const taskRef = doc(this.firestore, 'tasks', taskId,)
    const stepKey = data[0]
    const stepValue = data[1]
    const myData = { [`steps.${stepKey}`]: stepValue }
    updateDoc(taskRef, myData)
      .then(() => console.log('Steps property updated'))
      .catch(error => console.log('Error updating steps property ', error))
  }

}