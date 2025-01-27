import { Component, inject, input, Signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MessageService, MessageType } from '../../../services/message.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Message } from '../../../types/message.interface';


interface ConfigModel {
  readonly actions: { label: string, redirectTo: string }[];
  readonly type: MessageType
}

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {
  config = input<ConfigModel>()

  private messageService = inject(MessageService)

  messages: Signal<Message[] | []> = toSignal(this.messageService.getAll(), { initialValue: [] })

  open(messageId: string) {
    console.log('message', messageId)
  }
}

// add feature read and unread