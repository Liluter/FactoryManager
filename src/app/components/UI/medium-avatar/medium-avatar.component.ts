import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-medium-avatar',
  standalone: true,
  imports: [],
  templateUrl: './medium-avatar.component.html',
  styleUrl: './medium-avatar.component.scss'
})
export class MediumAvatarComponent {
  @Input() user: { name: string, uid: string, workingDay: number, hoursWorked: number } | null = null
}
