import { inject, Injectable } from '@angular/core';
import { collection, query, where, getDocs, Firestore, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, EMPTY, Observable, combineLatest, concat, first, map, of, switchMap, take, tap } from 'rxjs';
import { User } from '../types/user.interface';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  defaultUser = [{ name: 'none', links: ['login'] }] as User[]
  firestore: Firestore = inject(Firestore)
  loginSubject = new BehaviorSubject('')
  loginSubject$ = this.loginSubject.asObservable()

  getLoggedInUsers(): Observable<User[]> {
    const userCollection = collection(this.firestore, 'users');
    const loggedInQuerry = query(userCollection, where('loggedIn', '==', true));
    const loggedInUsers$: Observable<User[]> = collectionData(loggedInQuerry, { idField: 'id' }) as Observable<User[]>
    // return combineLatest([this.loginSubject$, loggedInUsers$])
    //   .pipe(
    //     map(([log, loggedUser]) => {
    //       if (log == '') {
    //         return loggedUser
    //       }
    //       if (log == 'logOut') {
    //         return null
    //       }
    //       if (log == 'logIn') {
    //         return loggedUser
    //       }
    //       return loggedUser
    //     }),
    //     tap(data => console.log('combineLatest', data)))
    // return combineLatest([this.loginSubject$.pipe(
    //   switchMap((log) => {
    //     if (log === '' || log === 'logIn') {
    //       return loggedInUsers$
    //     }
    //     if (log == 'logOut') {
    //       return loggedInUsers$
    //     }
    //     if (log == 'logOutOne') {
    //       return loggedInUsers$
    //     }
    //     return loggedInUsers$
    //   })
    // ), this.loginSubject$]).pipe(map(([loggedInUsers, log]) => (loggedInUsers)))
    return loggedInUsers$
  }

  getAllUsers(): Observable<User[]> {
    const userCollection = collection(this.firestore, 'users');
    return collectionData(userCollection, { idField: 'id' }) as Observable<User[]>
  }

  async logOut(id: string) {
    // this.loginSubject.next('logOutOne')
    const itemRef = doc(this.firestore, 'users', id);
    const updatedData = {
      loggedIn: false
    }
    updateDoc(itemRef, updatedData)
      .then(() => console.log('Dokument zaktualizowany.'))
      .catch((error) => console.error('Błąd aktualizacji dokumentu', error))
  }
  async logIn(id: string) {
    // this.loginSubject.next('logOutOne')
    const itemRef = doc(this.firestore, 'users', id);
    const updatedData = {
      loggedIn: true
    }
    updateDoc(itemRef, updatedData)
      .then(() => console.log('Dokument zaktualizowany.'))
      .catch((error) => console.error('Błąd aktualizacji dokumentu', error))
  }

  async logOutAll(): Promise<void> {
    this.loginSubject.next('logOut')
    const userCollection = collection(this.firestore, 'users');
    const q = query(userCollection, where('loggedIn', '==', true));
    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (dok) => {
        const userRef = doc(this.firestore, 'users', dok.id);
        const userData = dok.data() as User;
        await updateDoc(userRef, { loggedIn: false })
      })
      console.log('Wylogowano wszystkich zalogowanych')
    } catch (error) {
      console.error("Błąd aktualizacji userów: ", error)
    }
  }
}