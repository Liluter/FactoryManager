import { Component, inject, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'
import { Users } from '../../../types/users.interface';
import { UserService } from '../../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { Auth, LocalUser } from '../../../types/auth.interface';
import { NgClass } from '@angular/common';

enum Role {
  admin = 'admin',
  standard = 'standard'
}

@Component({
  selector: 'newuser-form',
  standalone: true,
  imports: [FormsModule, RouterModule, NgClass],
  templateUrl: './newuser-form.component.html',
  styleUrl: './newuser-form.component.scss'
})
export class NewUserFormComponent {
  private readonly userService: UserService = inject(UserService)
  private readonly router: Router = inject(Router)
  @Input() creatorRole: string = 'standard'
  model: LocalUser = {
    username: '',
    email: '',
    password: '',
    role: 'standard'
  }

  async onSubmit(form: NgForm) {
    // this.emailError = null
    // this.credentialError = null
    // this.passwordError = null
    // try {
    //   await this.userService.logAuthIn(this.model.email, this.model.password)
    //   this.router.navigate(['/dashboard'])
    // } catch (err: any) {
    //   // console.log(err.code)
    //   // console.log(err.message)
    //   // switch (err.code) {
    //   //   case 'auth/invalid-credential': this.credentialError = err.message; break
    //   //   case 'auth/missing-password': this.passwordError = err.message; break
    //   //   case 'auth/invalid-email': this.emailError = err.message; break
    //   // }
    // }
    try {
      console.log('try submit ', this.model)
      await this.userService.createUser(this.model)
      console.log('Submitted')
    } catch (error) {
      console.log('Error in new user form')
    }
  }
}
