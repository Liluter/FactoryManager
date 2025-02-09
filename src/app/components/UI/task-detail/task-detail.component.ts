import { Component, computed, input, output, OutputEmitterRef, signal, Signal } from '@angular/core';

import { DatePipe } from '@angular/common';
import { ListItemComponent } from "../list-item/list-item.component";
import { TaskDetailsModel } from '../../../pages/task-page/dataModel.interface';
import { setColor } from '../../../../shared/functions';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [DatePipe, ListItemComponent, RouterModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent {
  data = input<TaskDetailsModel | undefined>()
  checkHandler: OutputEmitterRef<{ id: string, data: [string, boolean] }> = output()
  editMode = signal(false)
  setColor = setColor
  toggle(id: string | undefined, ref: HTMLInputElement) {
    if (id) {
      this.checkHandler.emit({ id: id, data: [ref.name, ref.checked] })
    }
  }
  delete() {
    console.log('DELETE')
  }
  toggleEdit() {
    this.editMode.update(v => !v)
  }

}
