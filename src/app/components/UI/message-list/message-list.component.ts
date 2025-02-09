import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigModel } from '../../../types/message.interface';


@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {
  config = input<ConfigModel>()
}