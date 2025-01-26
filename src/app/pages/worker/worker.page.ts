import { Component, computed, inject, input, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { AvatarImageComponent } from '../../components/UI/avatar-image/avatar-image.component';
import { HorizontalCardComponent } from "../../components/UI/horizontal-card/horizontal-card.component";
import { WorkerService } from '../../services/worker.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, delay, filter, Observable, of, Subscribable, switchMap, tap } from 'rxjs';
import { Worker } from '../../types/worker.interface';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartmentService, Task } from '../../services/department.service';

@Component({
  selector: 'app-worker-page',
  standalone: true,
  imports: [AvatarImageComponent, HorizontalCardComponent, FormsModule],
  templateUrl: './worker.page.html',
  styleUrl: './worker.page.scss'
})
export class WorkerPage {
  workerService: WorkerService = inject(WorkerService)
  departmentService: DepartmentService = inject(DepartmentService)
  id = input<string>('')
  worker: Signal<Worker | undefined> = toSignal(toObservable(this.id).pipe(
    switchMap(id => this.workerService.getOne(id))), { initialValue: undefined }
  )
  workingDayModel = signal(this.worker()?.workingDay)
  actualTask: Signal<Task | undefined> = toSignal(toObservable(this.worker).pipe(
    switchMap(worker => {
      if (!worker || !worker.actualTask || !worker.departmentId) {
        return of(undefined)
      }
      return this.departmentService.getOneActiveTaskForDepartment(worker?.actualTask, worker?.departmentId).pipe(
        catchError(error => {
          console.error("Error fetching task:", error);
          return of(undefined);
        }))
    }),
    filter(task => task !== undefined)
  ))
  department = toSignal(toObservable(this.worker).pipe(
    switchMap(worker => this.departmentService.getDepartment(worker?.departmentId))
  ))
}
