import { Component, computed, input, output, OutputEmitterRef, Signal } from '@angular/core';
import { Message } from '../../../types/message.interface';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-detail.component.html',
  styleUrl: './message-detail.component.scss'
})
export class MessageDetailComponent {
  readModel: Boolean = false
  data = input<Message | undefined>()
  checkHandler: OutputEmitterRef<boolean> = output()
  favouritesHandler = output()
  deleteHandler = output()
  dataKeys = computed(() => [
    [this.data()?.sender, 'Author'],
    [this.data()?.departments, 'Departments'],
    [this.data()?.recipients, 'Recipients'],
    [this.data()?.title, 'Title'],
    [this.data()?.message, 'Message'],
    [this.data()?.timestamp.toDate().toISOString(), 'Created'],
    [this.data()?.id, 'Id'],
  ])

  // - odpowiedz , przekaz ,  
  toggleFavourites() {
    this.favouritesHandler.emit()
  }
  toggleRead(ref: HTMLInputElement) {
    this.checkHandler.emit(ref.checked)

  }
  deleteMessage() {
    this.deleteHandler.emit()
  }
}
