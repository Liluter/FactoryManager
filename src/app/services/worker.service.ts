import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, doc, documentId, Firestore, query, where, docData, DocumentReference, DocumentData, getDocs, QuerySnapshot, getDoc, DocumentSnapshot } from '@angular/fire/firestore';
import { catchError, EMPTY, from, map, Observable, of, tap } from 'rxjs';
import { Worker } from '../types/worker.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private firestore: Firestore = inject(Firestore)

  // getOne(id: string): Observable<Worker | undefined> {
  //   if (id) {
  //     const docRef: DocumentReference<DocumentData, DocumentData> = doc(this.firestore, 'workers', id)
  //     console.log('Pobieram worker o id : ', id)
  //     return (docData(docRef) as Observable<Worker | undefined>).pipe(
  //       catchError(error => {
  //         console.error('Błąd pobierania pracownika:', id, error)
  //         return of(undefined)

  //       })
  //     )
  //   }
  //   return of(undefined)
  // }
  getOne(id: string): Observable<Worker | undefined> {
    if (!id) {
      return of(undefined);
    }

    const docRef = doc(this.firestore, 'workers', id);
    return from(getDoc(docRef)).pipe(
      map((snapshot: DocumentSnapshot<DocumentData>) => {
        if (snapshot.exists()) {
          return { id: snapshot.id, ...snapshot.data() } as Worker;
        } else {
          return undefined;
        }
      }),
      catchError(error => {
        console.error('Błąd pobierania pracownika:', id, error);
        return of(undefined);
      })
    );

  }

  // getMany(ids: string[]): Observable<Worker[]> {
  //   const q = query(collection(this.firestore, "workers"), where(documentId(), "in", ids));
  //   const workers$ = collectionData(q, { idField: 'id' }) as Observable<Worker[]>
  //   return workers$
  // }
  // getMany(ids: string[]): Observable<Worker[]> {
  //   const q = query(collection(this.firestore, "workers"), where(documentId(), "in", ids));
  //   const workers$ = collectionData(q, { idField: 'id' }) as Observable<Worker[]>
  //   return workers$.pipe(
  //     tap(workers => console.log("Workerzy przed obsługa błędów", workers)),
  //     catchError(error => {
  //       console.error('Błąd pobierania wielu pracowników:', error);
  //       return of([]); // Zwracamy pustą tablicę w przypadku błędu
  //     }),
  //     tap(workers => console.log("Workerzy po obsłudze błędów", workers))

  //   );
  // }
  getMany(ids: string[]): Observable<Worker[]> {
    if (ids.length === 0) {
      return of([]);
    }

    const q = query(collection(this.firestore, "workers"), where(documentId(), "in", ids));

    return from(getDocs(q)).pipe(
      map((snapshot: QuerySnapshot<DocumentData>) => {
        const workers: Worker[] = [];
        snapshot.forEach(doc => {
          const worker = doc.data() as Worker;
          worker.id = doc.id;
          workers.push(worker);
        });
        return workers;
      }),
      catchError(error => {
        console.error('Błąd pobierania wielu pracowników:', error);
        return of([]);
      })
    );
  }
}


