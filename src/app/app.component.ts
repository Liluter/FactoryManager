import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NavbarComponent } from "./components/UI/navbar/navbar.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './types/user.interface';
interface Item {
  name: string,
};

interface Link {
  list: string[],
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterModule, RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  userService: UserService = inject(UserService)
  allUsers$: Observable<User[]> = this.userService.getAllUsers()
  loggedUser$: Observable<User[] | null> = this.userService.getLoggedInUsers()


  logOut(id: string) {
    this.userService.logOut(id)
  }
  logOutAll() {
    this.userService.logOutAll().then(() => console.log('wylogowano'))
  }
}
