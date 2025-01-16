import { Component, inject } from '@angular/core';
import { BranchDataService } from '../../services/branch-data.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MediumAvatarComponent } from "../../components/UI/medium-avatar/medium-avatar.component";
import { BranchDataModel, Message } from '../../types/data.interface';
import { MessageListPage } from '../message-list-page/message-list-page';
import { MessageGr, GroupService, Task, Group } from '../../services/group.service';
import { Observable, tap } from 'rxjs';


@Component({
  selector: 'app-workshop-page',
  standalone: true,
  imports: [MediumAvatarComponent, MessageListPage, AsyncPipe],
  templateUrl: './workshop.page.html',
  styleUrl: './workshop.page.scss'
})
export class WorkshopPage {
  service: BranchDataService = inject(BranchDataService)
  data: BranchDataModel = this.service.branchDataMockup.filter(el => el.branchTitle === 'workshop')[0]
  tabs: string[] = []
  notifications = {
    activeTasks: this.data.tasks?.activeTasks?.length,
    messages: this.data.messages.unread.length,
    workers: this.data.workers?.length
  }
  actualTab: string = this.tabs[0]
  workers: string[] = []
  groupService = inject(GroupService)
  group$: Observable<Group> = this.groupService.getWorkshopGroup()
    .pipe(
      tap(data => {
        this.workers = data.members
        this.tabs = data.tabs
        this.actualTab = this.tabs[0]
        console.log('grupe', data)
      }),
    )
  messages$: Observable<MessageGr[]> = this.groupService.getMessagesForWorkshop()
  tasks$: Observable<Task[]> = this.groupService.getActiveTasksForWorkshop().pipe(tap(data => console.log('tasks', data)))
  open(task: Task) {
    console.log(task)
  }
  selectTab(tab: string) {
    this.actualTab = tab
  }
  setColor(priority: 0 | 1 | 2 | 3): string {
    switch (priority) {
      case 0: return 'text-bg-danger';
      case 1: return 'text-bg-warning';
      case 2: return 'text-bg-info';
      case 3: return 'text-bg-secondary';
    }
  }
}
