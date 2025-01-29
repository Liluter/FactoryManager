import { Component, inject, input, InputSignal, Signal } from '@angular/core';
import { MessageListPage } from "../message-list-page/message-list-page";
import { WorkerService } from '../../services/worker.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { MessageService } from '../../services/message.service';
import { Message } from '../../types/message.interface';
import { of } from 'rxjs';

@Component({
  selector: 'app-mailbox-page',
  standalone: true,
  imports: [MessageListPage],
  templateUrl: './mailbox.page.html',
  styleUrl: './mailbox.page.scss'
})
export class MailboxPage {
  workerId: InputSignal<string | undefined> = input()
  workerService = inject(WorkerService)
  messageSerevice = inject(MessageService)
  department: Signal<string | undefined> = toSignal(toObservable(this.workerId).pipe(
    switchMap(workerId => {
      if (workerId) {
        return this.workerService.getOne(workerId)
      } else {
        return of(undefined)
      }
    }),
    tap(worker => console.log('worker', worker)),
    map(worker => worker?.departmentId),
  ), { initialValue: undefined })
}
