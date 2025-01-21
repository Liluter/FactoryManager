import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, documentId, Firestore, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Worker } from '../types/worker.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private firestore: Firestore = inject(Firestore)
  getMany(ids: string[]): Observable<Worker[]> {
    const q = query(collection(this.firestore, "workers"), where(documentId(), "in", ids));
    const workers$ = collectionData(q, { idField: 'id' }) as Observable<any[]>
    return workers$
  }
}
