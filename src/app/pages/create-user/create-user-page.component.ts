import { Component, inject } from '@angular/core';
import { NewUserFormComponent } from '../../components/UI/newuser-form/newuser-form..component';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs';
import { ROLES } from '../../types/auth.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'create-user-page',
  standalone: true,
  imports: [NewUserFormComponent],
  templateUrl: './create-user-page.component.html',
  styleUrl: './create-user-page.component.scss'
})
export class CreateUserPageComponent {
  private userService: UserService = inject(UserService)
  role: ROLES = ROLES.standard


  loggedUser = this.userService.userSubject$.pipe(
    tap(user => {
      console.log('in create-user', user?.role)
      if (user) {
        if (user?.role === ROLES.admin) {
          this.role = ROLES.admin
          return
        } else {
          this.role = user.role
        }
      }
      return
    }),
    takeUntilDestroyed()
  ).subscribe()


}
