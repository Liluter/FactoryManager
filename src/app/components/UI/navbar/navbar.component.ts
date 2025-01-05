import { Component, inject, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [RouterLink],
})
export class NavbarComponent {
  @Input() links: string[] = ['login']
  userService: UserService = inject(UserService)

  async routeTo(link: string) {
    if (link === 'logout') {
      await this.userService.logAuthOut()
      console.log('Logged Out from navbar')
    }
  }

}
