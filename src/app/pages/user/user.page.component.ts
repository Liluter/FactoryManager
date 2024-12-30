import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { User } from '@angular/fire/auth'

@Component({
  selector: 'user-page',
  templateUrl: './user.page.component.html',
  styleUrl: './user.page.component.scss',
  imports: [RouterModule, AsyncPipe],
  standalone: true
})
export class UserPageComponent {
  private userService = inject(UserService)
  user$: Observable<User> = this.userService.getloggedInUser().pipe(tap((data) => console.log(data)))

  async logOut() {
    await this.userService.logAuthOut()
  }
}
