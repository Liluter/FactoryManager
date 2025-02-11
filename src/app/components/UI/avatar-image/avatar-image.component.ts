import { NgClass, NgStyle } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-avatar-image',
  standalone: true,
  imports: [],
  templateUrl: './avatar-image.component.html',
  styleUrl: './avatar-image.component.scss',
})
export class AvatarImageComponent {
  @Input() id: string = '0'
  @Input() selected: boolean = false
  @Input() hoverable: boolean = false
  @Input() size: 'xs' | 's' | 'm' | 'l' | 'xl' = 's'
}
