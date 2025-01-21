import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-image',
  standalone: true,
  imports: [NgClass],
  templateUrl: './avatar-image.component.html',
  styleUrl: './avatar-image.component.scss',
})
export class AvatarImageComponent {
  @Input() id: string = '0'
  @Input() selected: boolean = false
  @Input() hoverable: boolean = false
  @Input() size: 'xs' | 's' | 'm' | 'l' | 'xl' = 's'
}
