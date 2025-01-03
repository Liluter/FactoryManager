import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { delay, distinctUntilChanged, filter, map, Observable, switchMap, tap } from 'rxjs';
import { NavbarComponent } from "./components/UI/navbar/navbar.component";
import { ActivatedRoute, Data, NavigationEnd, Router, RouterModule, RouterOutlet, UrlSegment } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from 'firebase/auth';
import { FSUser, LocalUser } from './types/auth.interface';
import { RoutesService } from './services/routes.service';

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
  styleUrl: './app.component.scss',
})
export class AppComponent {
  userService: UserService = inject(UserService)
  links: string[] = ['login']
  // allUsers$: Observable<Users[]> = this.userService.getAllUsers()
  // loggedUser$: Observable<User[] | null> = this.userService.getLoggedInUsers()
  loggedUser$: Observable<FSUser | null> = this.userService.getloggedInUser().pipe(
    tap(user => {
      if (user?.role === 'standard') {
        this.links = ['user', 'dashboard', 'logout']
      } else if (user?.role === 'admin') {
        this.links = ['user', 'dashboard', 'settings', 'logout']
        return
      }
      if (user?.links) {
        this.links = user.links
        return
      }
    })
  )
  private routesServise: RoutesService = inject(RoutesService)
  currentUrl$ = this.routesServise.currenttUrl$

  logOut(id: string) {
    // this.userService.logOut(id)
  }
  logOutAll() {
    // this.userService.logOutAll().then(() => console.log('wylogowano'))
  }
}
