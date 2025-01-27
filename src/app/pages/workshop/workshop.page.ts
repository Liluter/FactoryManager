import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { BranchDataService } from '../../services/branch-data.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MediumAvatarComponent } from "../../components/UI/medium-avatar/medium-avatar.component";
import { BranchDataModel, Message } from '../../types/data.interface';
import { MessageListPage } from '../message-list-page/message-list-page';
import { MessageGr, DepartmentService, Department } from '../../services/department.service';
import { catchError, concatMap, filter, forkJoin, from, map, mergeMap, Observable, of, switchMap, tap, timeout, toArray } from 'rxjs';
import { UserService } from '../../services/user.service';
import { DocumentData } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { WorkerService } from '../../services/worker.service';
import { Worker } from '../../types/worker.interface';
import { RouterModule } from '@angular/router';
import { Task, TaskWithContractorNames } from '../../types/task.interface';
import { TaskService } from '../../services/task.service';


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
  workshopId = '5rGeu1EDa4xsBlsz616a'
  department = 'workshop'
  data: BranchDataModel = this.service.branchDataMockup.filter(el => el.branchTitle === 'workshop')[0]
  // tabs: string[] | undefined = []
  notifications = {
    activeTasks: this.data.tasks?.activeTasks?.length,
    messages: this.data.messages.unread.length,
    workers: this.data.workers?.length
  }
  // workers$!: Observable<{ name: string, uid: string, workingDay: number, hoursWorked: number, avatarID: string }[]>
  departmentService: DepartmentService = inject(DepartmentService)
  taskService: TaskService = inject(TaskService)
  group$: Observable<Department | null> = this.departmentService.getDepartment(this.workshopId)
  actualTab$ = this.departmentService.actualTab.asObservable()
  tabs: Signal<string[] | undefined> = toSignal(this.departmentService.getDepartment(this.workshopId)
    .pipe(
      tap(data => {
        if (!this.departmentService.actualTab.getValue()) {
          if (data) {
            this.departmentService.actualTab.next(data?.tabs[0])
          } else this.departmentService.actualTab.next('All')
        }
      }),
      map(data => data?.tabs)), { initialValue: [] })
  workers: Signal<Worker[]> = toSignal(this.group$.pipe(switchMap(data => {
    if (data) {
      return this.workerService.getMany(data.members)
    }
    return of([])
  })), { initialValue: [] })

  messages$: Observable<MessageGr[]> = this.departmentService.getMessagesForWorkshop()
  // tasks$: Observable<Task[]> = this.departmentService.getActiveTasksForWorkshop()
  //   .pipe(
  //     map(tasks => tasks.map(task => ({ ...task, started: new Date(task.timestamp.seconds * 1000).toISOString() })))
  //   )
  tasksWithContractors$: Observable<TaskWithContractorNames[]> = this.taskService.getActiveTasksForDepartment(this.department)
    .pipe(
      map(tasks => tasks.map(task => ({ ...task, started: new Date(task.timestamp.seconds * 1000).toISOString() })))
      ,
      concatMap(tasks => from(tasks).pipe(
        concatMap(task => {
          if (task.contractors && task.contractors.length > 0) {
            return this.workerService.getMany(task.contractors).pipe(
              map(workers => {
                return workers.map(worker => worker.name);
              }),
              map(workerNames => ({ ...task, contractorNames: workerNames })),
              catchError(err => {
                return of({ ...task, contractorNames: [] })
              })
            );
          } else {
            return of({ ...task, contractorNames: [] });
          }
        }),
        toArray(),
      )),
    );
  open(task: Task) {
    console.log(task)
  }
  selectTab(tab: string) {
    this.departmentService.actualTab.next(tab)
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
