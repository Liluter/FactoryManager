import { Component, inject, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'
import { Users } from '../../../types/users.interface';
import { UserService } from '../../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { Auth, LocalUser, ROLES } from '../../../types/auth.interface';
import { NgClass } from '@angular/common';
import { AvatarImageComponent } from "../avatar-image/avatar-image.component";

enum Role {
  admin = 'admin',
  standard = 'standard'
}

@Component({
  selector: 'newuser-form',
  standalone: true,
  imports: [FormsModule, RouterModule, NgClass, AvatarImageComponent],
  templateUrl: './newuser-form.component.html',
  styleUrl: './newuser-form.component.scss'
})
export class NewUserFormComponent {
  private readonly userService: UserService = inject(UserService)
  private readonly router: Router = inject(Router)
  @Input() creatorRole!: ROLES
  roles = ROLES
  model: LocalUser = {
    username: '',
    email: '',
    password: '',
    role: ROLES.standard,
    links: ['login'],
    selectedAvatar: '0'
  }
  emailError: string | null = null
  passwordError: string | null = null
  credentialError: string | null = null
  networkError: string | null = null

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
    this.emailError = null
    this.credentialError = null
    this.passwordError = null
    this.networkError = null
    try {
      console.log('try submit ', this.model)
      await this.userService.createUser(this.model)
      this.router.navigate(['/user'])
      console.log('Submitted')
    } catch (error: any) {
      console.log('Error in new user form')
      console.log(error.code)
      switch (error.code) {
        case 'auth/invalid-credential': this.credentialError = error.message; break
        case 'auth/missing-password': this.passwordError = error.message; break
        case 'auth/invalid-email': this.emailError = error.message; break
        case 'auth/network-request-failed': this.networkError = error.message; break
        case 'auth/email-already-in-use': this.emailError = error.message; break
      }
      console.log(error.message)
    }
  }
  toggleSelect(idx: string) {
    if (this.model.selectedAvatar === idx) {
      return
    } else (
      this.model.selectedAvatar = idx
    )
  }
}
