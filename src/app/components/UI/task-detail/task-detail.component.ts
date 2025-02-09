import { Component, computed, input, Signal } from '@angular/core';
import { Task } from '../../../types/task.interface';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';
import { ListItemComponent } from "../list-item/list-item.component";

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [DatePipe, ListItemComponent],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent {
  data = input<Task | undefined>()
  keyValuesSteps: Signal<[string, boolean][]> = computed<[string, boolean][]>(() => {
    const steps = this.data()?.steps
    if (steps) {
      return Object.entries(steps)
    }
    return []
  })

}
