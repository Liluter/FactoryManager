import { Component, computed, input, output, OutputEmitterRef, Signal } from '@angular/core';

import { DatePipe } from '@angular/common';
import { ListItemComponent } from "../list-item/list-item.component";
import { TaskDetailsModel } from '../../../pages/task-page/dataModel.interface';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [DatePipe, ListItemComponent],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent {
  data = input<TaskDetailsModel | undefined>()
  checkHandler: OutputEmitterRef<{ id: string, data: [string, boolean] }> = output()
  // keyValuesSteps: Signal<[string, boolean][]> = computed<[string, boolean][]>(() => {
  //   const steps = this.data()?.steps
  //   if (steps) {
  //     return Object.entries(steps)
  //   }
  //   return []
  // })

  toggle(id: string | undefined, ref: HTMLInputElement) {
    if (id) {
      this.checkHandler.emit({ id: id, data: [ref.name, ref.checked] })
    }
  }
  delete() {
    console.log('DELETE')
  }
}
