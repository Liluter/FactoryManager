import { Component, input, Input } from '@angular/core';
import { BrnachDataModel } from '../../../types/data.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card-widget',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './card-widget.component.html',
  styleUrl: './card-widget.component.scss'
})
export class CardWidgetComponent {
  @Input() title: string = ''
  @Input() notifications: number = 0
  @Input() data: BrnachDataModel = {
    branchTitle: '',
    messeges: [{ author: '', createdAt: '', message: '' }],
    notifications: 0,
  }


}
