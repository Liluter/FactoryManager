import { Component, computed, inject, input, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageDetailComponent } from '../../components/UI/message-detail/message-detail.component';
import { MessageService } from '../../services/message.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Message } from '../../types/message.interface';
import { switchMap } from 'rxjs';


@Component({
  standalone: true,
  imports: [RouterModule, MessageDetailComponent],
  templateUrl: './message-detail.page.html',
  styleUrl: './message-detail.page.scss'
})
export class MessageDetailPage {
  id = input<string>('')
  messageService = inject(MessageService)
  data: Signal<Message | undefined> = toSignal(toObservable(this.id).pipe(
    switchMap(id => this.messageService.getOne(id))
  ), { initialValue: undefined })
}
