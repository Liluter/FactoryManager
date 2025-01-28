import { Component, computed, inject, input, InputSignal, signal, Signal, WritableSignal } from '@angular/core';
import { MessageListComponent } from "../../components/UI/message-list/message-list.component";
import { ConfigModel, Message, MessageType } from '../../types/message.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { MessageService } from '../../services/message.service';



@Component({
  selector: 'app-message-list-page',
  standalone: true,
  imports: [MessageListComponent],
  templateUrl: './message-list-page.html',
  styleUrl: './message-list-page.scss'
})
export class MessageListPage {
  private messageService = inject(MessageService)

  readMessages: Signal<Message[] | []> = toSignal(this.messageService.getAll().pipe(
    map(messages => messages.filter(message => message.read)),
  ), { initialValue: [] })
  unreadMessages: Signal<Message[] | []> = toSignal(this.messageService.getAll().pipe(
    map(messages => messages.filter(message => !message.read))
  ), { initialValue: [] })

  configRead: Signal<ConfigModel> = computed((): ConfigModel => {
    return {
      actions: [
        {
          label: 'Open message',
          redirectTo: '/message'
        }
      ], type: MessageType.read,
      messages: this.readMessages()
    }
  },)
  configUnread: Signal<ConfigModel> = computed((): ConfigModel => {
    return {
      actions: [{
        label: 'Open message',
        redirectTo: '/message'
      }],
      type: MessageType.unread,
      messages: this.unreadMessages()
    }
  })


}
