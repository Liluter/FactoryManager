import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { NavbarComponent } from "./components/UI/navbar/navbar.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { FSUser } from './types/auth.interface';
import { RoutesService } from './services/routes.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterModule, RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  links: string[] = ['login']
  userService: UserService = inject(UserService)
  private routesServise: RoutesService = inject(RoutesService)
  currentUrl$ = this.routesServise.currenttUrl$
  loggedUser$: Observable<FSUser | undefined> = this.userService.userSubject$.pipe(
    tap(user => {
      if (user?.role === 'standard') {
        this.links = ['user', 'mailbox', 'dashboard', 'logout']
      } else if (user?.role === 'admin') {
        this.links = ['user', 'mailbox', 'dashboard', 'settings', 'logout']
      } else if (user?.links) {
        this.links = user?.links
      } else {
        this.links = ['login']
      }
      return
    })
  )
}
