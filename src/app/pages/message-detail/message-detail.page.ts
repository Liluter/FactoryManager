import { Component, computed, inject, input, Signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageDetailComponent } from '../../components/UI/message-detail/message-detail.component';
import { MessageService } from '../../services/message.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Message } from '../../types/message.interface';
import { of, switchMap } from 'rxjs';


@Component({
  standalone: true,
  imports: [RouterModule, MessageDetailComponent],
  templateUrl: './message-detail.page.html',
  styleUrl: './message-detail.page.scss'
})
export class MessageDetailPage {
  router: Router = inject(Router)
  id = input<string | undefined>()
  messageService = inject(MessageService)
  data: Signal<Message | undefined> = toSignal(toObservable(this.id).pipe(
    switchMap(id => {
      if (id) {
        return this.messageService.getOne(id)
      } else {
        return of(undefined)
      }
    })
  ), { initialValue: undefined })

  toggleFavourites() {
    const messageID = this.id()
    if (messageID) {
      if (this.data()?.favourite) {
        this.messageService.toggleFavourite(messageID, false)
      } else {
        this.messageService.toggleFavourite(messageID, true)
      }
    }
  }
  deleteMessage() {
    const messageID = this.id()
    if (messageID) {
      this.messageService.delete(messageID)
      this.router.navigate(['/mailbox'])
    }
  }
}
