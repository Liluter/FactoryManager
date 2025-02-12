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
    const tasksCollection = collection(this.firestore, 'tasks')
    const q = query(tasksCollection, where('department', "==", department), where('active', "==", true), orderBy('priority'))
    return collectionData(q, { idField: 'id' }) as Observable<Task[]>
  }
  getOne(id: string | undefined): Observable<Task | undefined> {
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
      .then(() => console.log(`Step ${stepKey} property updated`))
      .catch(error => console.log('Error updating steps property ', error))
  }

}