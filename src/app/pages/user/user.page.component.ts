import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable, tap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FSUser } from '../../types/auth.interface';

@Component({
  selector: 'user-page',
  templateUrl: './user.page.component.html',
  styleUrl: './user.page.component.scss',
  imports: [RouterModule, AsyncPipe, DatePipe],
  standalone: true
})
export class UserPageComponent {
  private userService = inject(UserService)
  // user$: Observable<FSUser | null> = this.userService.getloggedInUser().pipe(tap(user => console.log('W user.page')))
  user$: Observable<FSUser | null> = this.userService.userSubject$

  async logOut() {
    await this.userService.logAuthOut()
    console.log('Logged Out from user page')

  }
}
