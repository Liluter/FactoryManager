import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NavbarComponent } from "./components/UI/navbar/navbar.component";

interface Item {
  name: string,
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, NavbarComponent],
  template: `
  <app-navbar [links]="['Dashboard','Workshop']">Factory Manager</app-navbar>
  <p>Testing...</p>
  <ul>
    @for (item of item$ | async; track item) {
      <li>
        {{ item.name }}
      </li>
    }


  </ul>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  item$: Observable<Item[]>;
  firestore: Firestore = inject(Firestore);

  constructor() {
    const itemCollection = collection(this.firestore, 'items');
    this.item$ = collectionData<Item>(itemCollection);

  }

}
