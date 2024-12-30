import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Users } from '../../../types/users.interface';
import { UserService } from '../../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../types/auth.interface';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  userService: UserService = inject(UserService)
  router: Router = inject(Router)
  emailError: string | null = null
  passwordError: string | null = null
  credentialError: string | null = null
  model: Auth = {
    email: '',
    password: ''
  }

  async onSubmit() {
    this.emailError = null
    this.credentialError = null
    this.passwordError = null
    try {
      await this.userService.logAuthIn(this.model.email, this.model.password)
      this.router.navigate(['/dashboard'])
    } catch (err: any) {
      // console.log(err.code)
      console.log(err.message)
      switch (err.code) {
        case 'auth/invalid-credential': this.credentialError = err.message; break
        case 'auth/missing-password': this.passwordError = err.message; break
        case 'auth/invalid-email': this.emailError = err.message; break
      }
    }
  }
}
