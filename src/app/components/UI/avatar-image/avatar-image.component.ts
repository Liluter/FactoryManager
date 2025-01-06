import { NgClass } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar-image',
  standalone: true,
  imports: [NgClass],
  templateUrl: './avatar-image.component.html',
  styleUrl: './avatar-image.component.scss',
})
export class AvatarImageComponent implements OnInit {
  @Input() id: string = '0'
  @Input() selected: boolean = false
  @Input() size: 's' | 'm' | 'l' | 'xl' = 's'
  @Input() hoverable: boolean = false
  @HostBinding('style.--size') mySize = 'var(--size-s)'
  @HostBinding('style.--scale') myScale = 'var(--size-s)'
  ngOnInit() {
    switch (this.size) {
      case 's': this.mySize = 'var(--size-s)'; this.myScale = 'var(--scale-s)'; break
      case 'm': this.mySize = 'var(--size-m)'; this.myScale = 'var(--scale-m)'; break
      case 'l': this.mySize = 'var(--size-l)'; this.myScale = 'var(--scale-l)'; break
      case 'xl': this.mySize = 'var(--size-xl)'; this.myScale = 'var(--scale-xl)'; break
    }
  }
}
