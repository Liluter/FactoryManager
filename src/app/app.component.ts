import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { NavbarComponent } from "./components/UI/navbar/navbar.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from 'firebase/auth';
import { FSUser, LocalUser } from './types/auth.interface';

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
  // allUsers$: Observable<Users[]> = this.userService.getAllUsers()
  // loggedUser$: Observable<User[] | null> = this.userService.getLoggedInUsers()
  loggedUser$: Observable<FSUser | null> = this.userService.getloggedInUser().pipe(tap(data => console.log(Date.now())))


  logOut(id: string) {
    // this.userService.logOut(id)
  }
  logOutAll() {
    // this.userService.logOutAll().then(() => console.log('wylogowano'))
  }
}
