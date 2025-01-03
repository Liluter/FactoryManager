import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { delay, distinctUntilChanged, filter, map, Observable, switchMap, tap } from 'rxjs';
import { NavbarComponent } from "./components/UI/navbar/navbar.component";
import { ActivatedRoute, Data, NavigationEnd, Router, RouterModule, RouterOutlet, UrlSegment } from '@angular/router';
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
  styleUrl: './app.component.scss',
})
export class AppComponent {
  userService: UserService = inject(UserService)
  // allUsers$: Observable<Users[]> = this.userService.getAllUsers()
  // loggedUser$: Observable<User[] | null> = this.userService.getLoggedInUsers()
  loggedUser$: Observable<FSUser | null> = this.userService.getloggedInUser()
  _url = ''
  private router: Router = inject(Router)
  private route: ActivatedRoute = inject(ActivatedRoute)
  currentUrl$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    tap(data => console.log(data)),
    switchMap(() => this.route.pathFromRoot),
    tap(data => console.log('dddd', data.firstChild?.routeConfig?.path)),
    map(data => data.firstChild?.routeConfig?.path),
    distinctUntilChanged(),
    tap(data => this._url = data ?? '')
  )

  logOut(id: string) {
    // this.userService.logOut(id)
  }
  logOutAll() {
    // this.userService.logOutAll().then(() => console.log('wylogowano'))
  }
}
