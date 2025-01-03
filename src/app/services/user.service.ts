import { inject, Injectable } from '@angular/core';
import { collection, query, where, getDocs, Firestore, collectionData, doc, updateDoc, setDoc, docData } from '@angular/fire/firestore';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { Users } from '../types/users.interface';
import { Auth, signInWithEmailAndPassword, user, UserCredential, signOut, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { User } from 'firebase/auth'
import { FSUser, LocalUser } from '../types/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  defaultUser = [{ name: 'none', links: ['login'] }] as Users[]
  private firestore: Firestore = inject(Firestore)
  private auth: Auth = inject(Auth)
  loginSubject = new BehaviorSubject('')
  loginSubject$ = this.loginSubject.asObservable()
  loggedUser!: User

  // getLoggedInUsers(): Observable<Users[]> {
  //   const userCollection = collection(this.firestore, 'users');
  //   const loggedInQuerry = query(userCollection, where('loggedIn', '==', true));
  //   const loggedInUsers$: Observable<Users[]> = collectionData(loggedInQuerry, { idField: 'id' }) as Observable<Users[]>
  //   // return combineLatest([this.loginSubject$, loggedInUsers$])
  //   //   .pipe(
  //   //     map(([log, loggedUser]) => {
  //   //       if (log == '') {
  //   //         return loggedUser
  //   //       }
  //   //       if (log == 'logOut') {
  //   //         return null
  //   //       }
  //   //       if (log == 'logIn') {
  //   //         return loggedUser
  //   //       }
  //   //       return loggedUser
  //   //     }),
  //   //     tap(data => console.log('combineLatest', data)))
  //   // return combineLatest([this.loginSubject$.pipe(
  //   //   switchMap((log) => {
  //   //     if (log === '' || log === 'logIn') {
  //   //       return loggedInUsers$
  //   //     }
  //   //     if (log == 'logOut') {
  //   //       return loggedInUsers$
  //   //     }
  //   //     if (log == 'logOutOne') {
  //   //       return loggedInUsers$
  //   //     }
  //   //     return loggedInUsers$
  //   //   })
  //   // ), this.loginSubject$]).pipe(map(([loggedInUsers, log]) => (loggedInUsers)))
  //   return loggedInUsers$
  // }
  getloggedInUser(): Observable<FSUser | null> {
    const userCollection = collection(this.firestore, 'users');
    console.log('getloggoedInUser() => this.auth current sign-in user :', this.auth.currentUser)
    const userAuth$: Observable<User> = user(this.auth)
    const userFS$: Observable<FSUser | null> = userAuth$.pipe(switchMap((user) => {
      if (user) {
        return docData(doc(this.firestore, 'users/' + user.uid), { idField: 'id' })
      } else {
        return of(null)
      }
    }
    ))
    return userFS$
  }
  getAllUsers(): Observable<Users[]> {
    const userCollection = collection(this.firestore, 'users');
    return collectionData(userCollection, { idField: 'id' }) as Observable<Users[]>
  }

  async logOut(id: string): Promise<void> {

    // this.loginSubject.next('logOutOne')
    const itemRef = doc(this.firestore, 'users', id);
    const updatedData = {
      loggedIn: false
    }
    updateDoc(itemRef, updatedData)
      .then(() => console.log('Wylogowano użytkownika.'))
      .catch((error) => console.error('Błąd aktualizacji dokumentu', error))
  }
  async logIn(id: string): Promise<void> {
    const itemRef = doc(this.firestore, 'users', id);
    const updatedData = {
      loggedIn: true
    }
    updateDoc(itemRef, updatedData)
      .then(() => console.log('Dokument zaktualizowany.'))
      .catch((error) => console.error('Błąd aktualizacji dokumentu', error))
  }
  async logInUser(name: string, password: string) {

    const userCollection = collection(this.firestore, 'users');
    const nameQuerry = query(userCollection, where('name', '==', name));
    try {
      const querySnapshot = await getDocs(nameQuerry)
      if (querySnapshot.size > 1) {
        let err = new Error('Więcej niż jeden użytkownik o tym imieniu', { cause: 'toomany-users' })
        throw err
      } else if (querySnapshot.empty) {
        let err = new Error('Nie znaleziono użytkownika o tym imieniu', { cause: 'not-found' })
        throw err
      } else {
        const userDoc = querySnapshot.docs[0]
        const userRef = doc(this.firestore, 'users', userDoc.id);
        const userData = userDoc.data() as Users;
        if (userData.password === password) {
          await updateDoc(userRef, { loggedIn: true })
          return
        } else {
          let err = new Error('Niepoprawne hasło', { cause: 'password' })
          throw err
        }
      }
    } catch (error: any) {
      throw error
    }

  }

  async logAuthIn(email: string, password: string) {
    try {
      const userCredentials: UserCredential = await signInWithEmailAndPassword(this.auth, email, password)
      // console.log(userCredentioals.user)
      if (userCredentials) {
        this.loggedUser = userCredentials.user
      }
    } catch (error) {
      throw error
    }
  }
  async logAuthOut() {
    try {
      await signOut(this.auth)
    } catch (error) {
      throw error
    }
  }
  async createUser(userData: LocalUser): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, userData.email, userData.password)
      const newUserAuth: User = userCredential.user
      console.log('New Auth user created :', newUserAuth)
      const userDocRef = doc(this.firestore, 'users/' + newUserAuth.uid)
      const data: FSUser = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        links: userData.links,
        emailverified: newUserAuth.emailVerified,
        cratedAt: newUserAuth.metadata.creationTime,
        lastSignIn: newUserAuth.metadata.lastSignInTime,
        photoURL: newUserAuth.photoURL
      }
      await setDoc(userDocRef, data)
      console.log('New user sotore in FireStore : ', data)
    } catch (error) {
      console.log(error)
    }
  }

  // async logOutAll(): Promise<void> {
  //   this.loginSubject.next('logOut')
  //   const userCollection = collection(this.firestore, 'users');
  //   const q = query(userCollection, where('loggedIn', '==', true));
  //   try {
  //     const querySnapshot = await getDocs(q);

  //     querySnapshot.forEach(async (dok) => {
  //       const userRef = doc(this.firestore, 'users', dok.id);
  //       const userData = dok.data() as Users;
  //       await updateDoc(userRef, { loggedIn: false })
  //     })
  //     console.log('Wylogowano wszystkich zalogowanych')
  //   } catch (error) {
  //     console.error("Błąd aktualizacji userów: ", error)
  //   }
  // }
}