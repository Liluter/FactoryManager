import { Component, inject, input, Signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageDetailComponent } from '../../components/UI/message-detail/message-detail.component';
import { MessageService } from '../../services/message.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Message } from '../../types/message.interface';
import { of, switchMap } from 'rxjs';


@Component({
  standalone: true,
  imports: [RouterModule, MessageDetailComponent],
  templateUrl: './message.page.html',
  styleUrl: './message.page.scss'
})
export class MessagePage {
  router: Router = inject(Router)
  id = input<string>()

  messageService = inject(MessageService)
  read: Signal<boolean | undefined> = toSignal(toObservable(this.id).pipe(
    switchMap(id => {
      if (id) {
        return this.messageService.isRead(id)
      } else {
        return of(undefined)
      }
    })
  ), { initialValue: undefined })
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
  toggleRead(value: boolean) {
    const messageID = this.id()
    if (messageID) {
      this.messageService.toggleRead(messageID, value)
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
