import { Component, inject } from '@angular/core';
import { BranchDataService } from '../../services/branch-data.service';
import { DatePipe } from '@angular/common';
import { MediumAvatarComponent } from "../../components/UI/medium-avatar/medium-avatar.component";
import { BranchDataModel, Message } from '../../types/data.interface';
import { MessageListPage } from '../message-list-page/message-list-page';


@Component({
  selector: 'app-workshop-page',
  standalone: true,
  imports: [MediumAvatarComponent, MessageListPage],
  templateUrl: './workshop.page.html',
  styleUrl: './workshop.page.scss'
})
export class WorkshopPage {
  service: BranchDataService = inject(BranchDataService)
  data: BranchDataModel = this.service.branchDataMockup.filter(el => el.branchTitle === 'workshop')[0]
  tabs = ['Active Tasks', 'Workers', 'Messages', 'All']
  notifications = {
    activeTasks: this.data.tasks?.activeTasks?.length,
    messages: this.data.messages.unread.length,
    workers: this.data.workers?.length
  }
  actualTab: string = this.tabs[0]
  open(message: Message) {
    console.log(message.id)
  }
  selectTab(tab: string) {
    this.actualTab = tab
  }
}
