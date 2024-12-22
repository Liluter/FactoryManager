import { inject, Injectable } from '@angular/core';
import { collection, query, where, getDocs, Firestore, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore: Firestore = inject(Firestore)

  getLoggedIn(): Observable<User[]> {
    const userCollection = collection(this.firestore, 'users');
    const loggedInQuerry = query(userCollection, where('loggedIn', '==', true));
    return collectionData(loggedInQuerry, { idField: 'id' }) as Observable<User[]>
  }

  getAllUsers(): Observable<User[]> {
    const userCollection = collection(this.firestore, 'users');
    return collectionData(userCollection, { idField: 'id' }) as Observable<User[]>
  }

  logOut(id: string) {
    const itemRef = doc(this.firestore, 'users', id);
    const updatedData = {
      loggedIn: false
    }
    updateDoc(itemRef, updatedData)
      .then(() => console.log('Dokument zaktualizowany.'))
      .catch((error) => console.error('Błąd aktualizacji dokumentu', error))
  }
  async logOutAll() {
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

// import { Injectable } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
// import { City } from './city'; // Assuming you have a City interface/class

// @Injectable({
//   providedIn: 'root'
// })
// export class CityService {
//   private citiesCollection: AngularFirestoreCollection<City>;

//   constructor(private afs: AngularFirestore) {
//     this.citiesCollection = this.afs.collection<City>('cities');
//   }

//   addCities() {
//     this.citiesCollection.doc('SF').set({ 
//       name: "San Francisco", state: "CA", country: "USA",
//       capital: false, population: 860000,
//       regions: ["west_coast", "norcal"] 
//     });
//     this.citiesCollection.doc('LA').set({ 
//       name: "Los Angeles", state: "CA", country: "USA",
//       capital: false, population: 3900000,
//       regions: ["west_coast", "socal"] 
//     });
//     this.citiesCollection.doc('DC').set({ 
//       name: "Washington, D.C.", state: null, country: "USA",
//       capital: true, population: 680000,
//       regions: ["east_coast"] 
//     });
//     this.citiesCollection.doc('TOK').set({ 
//       name: "Tokyo", state: null, country: "Japan",
//       capital: true, population: 9000000,
//       regions: ["kanto", "honshu"] 
//     });
//     this.citiesCollection.doc('BJ').set({ 
//       name: "Beijing", state: null, country: "China",
//       capital: true, population: 21500000,
//       regions: ["jingjinji", "hebei"] 
//     });
//   }
// }