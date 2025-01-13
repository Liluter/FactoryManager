import { Component } from '@angular/core';
import { MessageListComponent } from "../../components/UI/message-list/message-list.component";

@Component({
  selector: 'app-message-list-page',
  standalone: true,
  imports: [MessageListComponent],
  templateUrl: './message-list-page.html',
  styleUrl: './message-list-page.scss'
})
export class MessageListPage {
  actions = [
    {
      label: 'Open Message',
      redirectTo: '/message'
    }
  ]
  types = [
    'unread', 'read'
  ]
}
