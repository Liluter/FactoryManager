import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { BranchDataService } from '../../services/branch-data.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MediumAvatarComponent } from "../../components/UI/medium-avatar/medium-avatar.component";
import { BranchDataModel, Message } from '../../types/data.interface';
import { MessageListPage } from '../message-list-page/message-list-page';
import { MessageGr, GroupService, Task, Group } from '../../services/group.service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { DocumentData } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { WorkerService } from '../../services/worker.service';
import { Worker } from '../../types/worker.interface';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-workshop-page',
  standalone: true,
  imports: [MediumAvatarComponent, MessageListPage, AsyncPipe, DatePipe, RouterModule],
  templateUrl: './workshop.page.html',
  styleUrl: './workshop.page.scss'
})
export class WorkshopPage {
  service: BranchDataService = inject(BranchDataService)
  userService: UserService = inject(UserService)
  workerService: WorkerService = inject(WorkerService)
  data: BranchDataModel = this.service.branchDataMockup.filter(el => el.branchTitle === 'workshop')[0]
  tabs: string[] = []
  notifications = {
    activeTasks: this.data.tasks?.activeTasks?.length,
    messages: this.data.messages.unread.length,
    workers: this.data.workers?.length
  }
  actualTab: string = this.tabs[0]
  // workers$!: Observable<{ name: string, uid: string, workingDay: number, hoursWorked: number, avatarID: string }[]>
  groupService = inject(GroupService)
  group$: Observable<Group> = this.groupService.getWorkshopGroup()
    .pipe(
      tap(data => {
        this.tabs = data.tabs
        this.actualTab = this.tabs[0]
      })
    )
  workers: Signal<Worker[]> = toSignal(this.group$.pipe(switchMap(data => this.workerService.getMany(data.members))), { initialValue: [] })

  messages$: Observable<MessageGr[]> = this.groupService.getMessagesForWorkshop()
  tasks$: Observable<Task[]> = this.groupService.getActiveTasksForWorkshop()
    .pipe(
      tap(data => console.log('tasks', data)),
      map(tasks => tasks.map(task => ({ ...task, started: new Date(task.timestamp.seconds * 1000).toISOString() })))
    )
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
