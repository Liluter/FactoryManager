import { Component, inject, Input } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { filter, map, tap } from 'rxjs';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [RouterModule, AsyncPipe]
})
export class NavbarComponent {
  @Input() links: string[] = ['login']
  userService: UserService = inject(UserService)
  private router: Router = inject(Router)
  currentUrl$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map((event: NavigationEnd) => {
      if (event.urlAfterRedirects.length > 1) {
        return event.urlAfterRedirects.replace('/', 'on ')
      } else {
        return ''
      }
    })
  )

  async routeTo(link: string) {
    if (link === 'logout') {
      await this.userService.logAuthOut()
      console.log('Logged Out')
    }
  }

}
