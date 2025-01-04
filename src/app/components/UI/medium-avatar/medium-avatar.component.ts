import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-medium-avatar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './medium-avatar.component.html',
  styleUrl: './medium-avatar.component.scss'
})
export class MediumAvatarComponent {
  percent: number = 0
  _user = { name: '', uid: '', workingDay: 0, hoursWorked: 8 }
  @Input() set user(user: { name: string, uid: string, workingDay: number, hoursWorked: number }) {
    this.percent = 100 * (user.hoursWorked / user.workingDay)
    this._user = {
      hoursWorked: user.hoursWorked,
      name: user.name,
      uid: user.uid,
      workingDay: user.workingDay
    }
  }

}
