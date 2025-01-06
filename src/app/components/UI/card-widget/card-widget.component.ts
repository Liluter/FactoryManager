import { Component, Input } from '@angular/core';
import { BranchDataModel } from '../../../types/data.interface';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-widget',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './card-widget.component.html',
  styleUrl: './card-widget.component.scss'
})
export class CardWidgetComponent {
  @Input() data: BranchDataModel = {
    branchTitle: '',
    messages: {
      read: [],
      unread: []
    },
    workers: null,
    notifications: 0,
    lastnotification: 0
  }


}
