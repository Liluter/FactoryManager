import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AvatarImageComponent } from "../avatar-image/avatar-image.component";
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";
import { Worker } from '../../../types/worker.interface';

@Component({
  selector: 'app-medium-avatar',
  standalone: true,
  imports: [AvatarImageComponent, ProgressBarComponent],
  templateUrl: './medium-avatar.component.html',
  styleUrl: './medium-avatar.component.scss'
})
export class MediumAvatarComponent {
  percent: number = 0
  _user = { name: '', id: '', workingDay: 0, hoursWorked: 8, avatarID: '0' }
  @Input() set user(user: Worker) {
    this.percent = 100 * (user.hoursWorked / user.workingDay)
    this._user = {
      hoursWorked: user.hoursWorked,
      name: user.name,
      id: user.id,
      workingDay: user.workingDay,
      avatarID: user.avatarID
    }
  }

}
