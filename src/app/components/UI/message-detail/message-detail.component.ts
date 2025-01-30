import { Component, computed, input, output, Signal } from '@angular/core';
import { Message } from '../../../types/message.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-message-detail',
  standalone: true,
  imports: [],
  templateUrl: './message-detail.component.html',
  styleUrl: './message-detail.component.scss'
})
export class MessageDetailComponent {
  data = input<Message | undefined>()
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
  deleteMessage() {
    this.deleteHandler.emit()
  }
}
