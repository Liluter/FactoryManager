import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[resize]',
  standalone: true
})
export class ResizeDirective {
  @Input() resize: 's' | 'm' | 'l' | 'xl' | null = null
  @HostBinding('style.--size') mySize = 'var(--size-s)'
  @HostBinding('style.--scale') myScale = 'var(--size-s)'
  ngOnInit() {
    switch (this.resize) {
      case 's': this.mySize = 'var(--size-s)'; this.myScale = 'var(--scale-s)'; break
      case 'm': this.mySize = 'var(--size-m)'; this.myScale = 'var(--scale-m)'; break
      case 'l': this.mySize = 'var(--size-l)'; this.myScale = 'var(--scale-l)'; break
      case 'xl': this.mySize = 'var(--size-xl)'; this.myScale = 'var(--scale-xl)'; break
    }

    console.log('resie dir', this.resize, this.mySize, this.myScale)
  }
}
