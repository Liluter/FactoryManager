import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, doc, documentId, Firestore, query, where, docData, DocumentReference, DocumentData } from '@angular/fire/firestore';
import { EMPTY, Observable, of } from 'rxjs';
import { Worker } from '../types/worker.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private firestore: Firestore = inject(Firestore)

  getOne(id: string): Observable<Worker | undefined> {
    if (id) {
      const docRef: DocumentReference<DocumentData, DocumentData> = doc(this.firestore, 'workers', id)
      return docData(docRef) as Observable<Worker | undefined>
    }
    return of(undefined)
  }

  getMany(ids: string[]): Observable<Worker[]> {
    const q = query(collection(this.firestore, "workers"), where(documentId(), "in", ids));
    const workers$ = collectionData(q, { idField: 'id' }) as Observable<Worker[]>
    return workers$
  }
}
