import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [RouterModule]
})
export class NavbarComponent {
  @Input() links: string[] = ['login']
  userService: UserService = inject(UserService)
  async routeTo(link: string) {
    if (link === 'logout') {
      await this.userService.logAuthOut()
      console.log('Logged Out')

    }
  }
}
