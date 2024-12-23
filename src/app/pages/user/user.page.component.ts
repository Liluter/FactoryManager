import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { QuerySnapshot, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { map, Observable, tap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { User } from '../../types/user.interface';

@Component({
  selector: 'user-page',
  templateUrl: './user.page.component.html',
  styleUrl: './user.page.component.scss',
  imports: [RouterModule, AsyncPipe],
  standalone: true
})
export class UserPageComponent {
  private userService = inject(UserService)
  user$: Observable<User[] | null> = this.userService.getLoggedInUsers()


}
