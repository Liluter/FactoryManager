import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-widget',
  standalone: true,
  imports: [],
  templateUrl: './card-widget.component.html',
  styleUrl: './card-widget.component.scss'
})
export class CardWidgetComponent {
  @Input() title: string = ''
}
