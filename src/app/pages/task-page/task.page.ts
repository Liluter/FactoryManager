import { Component, inject, input } from '@angular/core';
import { TaskDetailComponent } from "../../components/UI/task-detail/task-detail.component";
import { TaskService } from '../../services/task.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, of, switchMap } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { TaskDetailsModel } from './dataModel.interface';


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
        return this.taskService.getOne(id).pipe(
          map(data => {
            if (data) {
              const steps = data?.steps
              const updatedData: TaskDetailsModel = { ...data, steps: Object.entries(steps) }
              return updatedData
            }
            return data
          })
        )
      }
      return of(undefined)

    })
  ))
  toggleStep(event: { id: string, data: [string, boolean] }) {

    this.taskService.updateStep(event.id, event.data)
  }
}

// keyValuesSteps: Signal<[string, boolean][]> = computed<[string, boolean][]>(() => {
//     const steps = this.data()?.steps
//     if (steps) {
//       return Object.entries(steps)
//     }
//     return []
//   })

