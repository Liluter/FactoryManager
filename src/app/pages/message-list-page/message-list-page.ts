import { Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { MessageListComponent } from "../../components/UI/message-list/message-list.component";
import { ConfigModel, Message, MessageType } from '../../types/message.interface';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-message-list-page',
  standalone: true,
  imports: [MessageListComponent],
  templateUrl: './message-list-page.html',
  styleUrl: './message-list-page.scss'
})
export class MessageListPage {
  private readonly messageService = inject(MessageService)
  private readonly userService: UserService = inject(UserService)
  readonly department: InputSignal<string | undefined> = input()
  readonly directUserId: InputSignal<string | undefined> = input()
  private readonly department$ = toObservable(this.department)
  private readonly user$ = toObservable(this.directUserId)
  private readonly currentUser = this.userService.loggedFSUser.getValue()

  private readonly combined$: Observable<Message[] | []> = combineLatest([this.department$, this.user$]).pipe(
    switchMap(([department, directUserId]) => {
      if (department) {
        return this.messageService.getMessagesForDepartment(department)
      } else if (directUserId) {
        return this.messageService.getMessagesForUser(directUserId);
      } else {
        return of([])
      }
    }
    ),
  )

  private readonly readMessages: Signal<Message[] | []> = toSignal(this.combined$.pipe(
    map(messages => {
      const user = this.currentUser?.workerId
      if (user) {
        return messages.filter(message => message.readBy.length > 0 ? message.readBy.includes(user) : false)
      } else {
        return []
      }
    }),
  )
    , { initialValue: [] })

  private readonly unreadMessages: Signal<Message[] | []> = toSignal(this.combined$.pipe(
    map(messages => {
      const user = this.currentUser?.workerId
      if (user) {
        return messages.filter(message => message.readBy.length > 0 ? !message.readBy.includes(user) : true)
      } else {
        return []
      }
    }),
  )
    , { initialValue: [] })

  readonly configRead: Signal<ConfigModel> = computed((): ConfigModel => {
    return {
      actions: [{
        label: 'Open message',
        redirectTo: '/message'
      }],
      type: MessageType.read,
      messages: this.readMessages()
    }
  },)

  readonly configUnread: Signal<ConfigModel> = computed((): ConfigModel => {
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
