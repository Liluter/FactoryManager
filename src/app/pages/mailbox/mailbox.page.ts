import { Component, computed, inject, input, InputSignal, signal, Signal } from '@angular/core';
import { MessageListPage } from "../message-list-page/message-list-page";
import { WorkerService } from '../../services/worker.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { MessageModel, MessageService } from '../../services/message.service';
import { Message } from '../../types/message.interface';
import { of } from 'rxjs';
import { NgClass } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { serverTimestamp } from '@angular/fire/firestore';
import { FSUser } from '../../types/auth.interface';

@Component({
  selector: 'app-mailbox-page',
  standalone: true,
  imports: [MessageListPage, NgClass, FormsModule],
  templateUrl: './mailbox.page.html',
  styleUrl: './mailbox.page.scss'
})
export class MailboxPage {
  model: MessageModel = {
    message: '',
    departments: ['all'],
    recipients: [],
    title: '',
    sender: '',
    senderId: '',
    read: false,
  }
  userService = inject(UserService)
  activeUser$ = this.userService.loggedFSUser.asObservable()
  user: Signal<FSUser | undefined> = toSignal(this.activeUser$, { initialValue: undefined })
  newMailModal = signal(false)
  workerService = inject(WorkerService)
  messageSerevice = inject(MessageService)
  department: Signal<string | undefined> = toSignal(this.activeUser$.pipe(
    switchMap(user => {
      if (user?.workerId) {
        return this.workerService.getOne(user.workerId)
      } else {
        return of(undefined)
      }
    }),
    map(worker => worker?.departmentId),
  ), { initialValue: undefined })

  openModal() {
    this.newMailModal.set(true)
  }
  closeModal() {
    this.newMailModal.set(false)
  }
  onSubmit() {
    let mail: MessageModel
    if (this.model.departments?.includes('personal')) {
      mail = {
        message: this.model.message,
        recipients: this.model.recipients,
        title: this.model.title,
        departments: [],
        sender: this.user()?.username ?? '',
        senderId: this.user()?.workerId ?? '',
        read: false,
        timestamp: serverTimestamp()
      }
    } else {
      mail = {
        message: this.model.message,
        title: this.model.title,
        departments: this.model.departments,
        sender: this.user()?.username ?? '',
        senderId: this.user()?.workerId ?? '',
        read: false,
        timestamp: serverTimestamp()
      }
    }
    console.log('mail', mail)
    this.messageSerevice.sendMessage(mail).then((doc) => {
      console.log('doc', doc)
      this.closeModal()
      // show message info
    })
  }
}
