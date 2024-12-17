import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { NavbarComponent } from "./components/UI/navbar/navbar.component";
import { toSignal } from '@angular/core/rxjs-interop'
import { loggedIn } from '@angular/fire/auth-guard';
interface Item {
  name: string,
};

interface Link {
  list: string[],
};
interface User {
  name: string
  loggedIn: boolean
  links: string[]
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, NavbarComponent, JsonPipe],
  template: `
    @for (user of logged(); track user) {
      <app-navbar [links]="user.links">Factory Manager  - {{user.name}}</app-navbar>
    }
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  item$: Observable<Item[]>;
  firestore: Firestore = inject(Firestore);
  // link$: Observable<Link[]>;
  user$: Observable<User[]>;
  logged$: Observable<User[]>;
  // links: Signal<Link[]>
  logged: Signal<User[]>
  constructor() {
    const itemCollection = collection(this.firestore, 'items');
    // const linkCollection = collection(this.firestore, 'links');
    const userCollection = collection(this.firestore, 'users')
    this.item$ = collectionData<Item>(itemCollection);
    // this.link$ = collectionData<Link>(linkCollection);
    this.user$ = collectionData<Link>(userCollection);
    this.logged$ = this.user$.pipe(map(data => data.filter(user => user.loggedIn === true)))
    // this.links = toSignal(this.link$, { initialValue: [{ list: [] }] })
    this.logged = toSignal(this.logged$, { initialValue: [{ name: '', loggedIn: false, links: [] }] })

  }

}
