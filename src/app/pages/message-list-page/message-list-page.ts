import { Component, input, InputSignal } from '@angular/core';
import { MessageListComponent } from "../../components/UI/message-list/message-list.component";
import { MessageType } from '../../services/message.service';


@Component({
  selector: 'app-message-list-page',
  standalone: true,
  imports: [MessageListComponent],
  templateUrl: './message-list-page.html',
  styleUrl: './message-list-page.scss'
})
export class MessageListPage {
  department = input('all')
  actions = [
    {
      label: 'Open message',
      redirectTo: '/message'
    }
  ]
  types = MessageType
}
