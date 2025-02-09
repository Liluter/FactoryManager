import { Component, inject, input } from '@angular/core';
import { TaskDetailComponent } from "../../components/UI/task-detail/task-detail.component";
import { TaskService } from '../../services/task.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [TaskDetailComponent],
  templateUrl: './task.page.html',
  styleUrl: './task.page.scss'
})
export class TaskPage {
  id = input<string>()
  taskService = inject(TaskService)
  task = toSignal(toObservable(this.id).pipe(
    switchMap(id => {
      if (id) {
        return this.taskService.getOne(id)
      }
      return of(undefined)

    })
  ))
}
