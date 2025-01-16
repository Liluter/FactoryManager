import { Component, computed, inject, input, Signal } from '@angular/core';
import { BranchDataModel, Message } from '../../../types/data.interface';
import { DatePipe } from '@angular/common';
import { GroupService } from '../../../services/group.service';
import { RouterModule } from '@angular/router';


interface ConfigModel {
  readonly actions: { label: string, redirectTo: string }[];
  readonly type: string
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
  data!: Signal<BranchDataModel> //service
  private groupService = inject(GroupService)

  messages = computed(() => {
    if (this.config()?.type !== 'unread') {
      return this.groupService.messagesMocup['unread']
    } else {
      return this.groupService.messagesMocup['read']
    }
  })
  open(messageId: string) {
    console.log('message', messageId)
  }
}
