import { Component, computed, input, output, Signal } from '@angular/core';
import { Message } from '../../../types/message.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-message-detail',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './message-detail.component.html',
  styleUrl: './message-detail.component.scss'
})
export class MessageDetailComponent {
  data = input<Message | undefined>()
  favouritesHandler = output()
  dataKeys: Signal<(string | string[] | undefined)[][]> = computed(() => [
    [this.data()?.sender, 'Author'],
    [this.data()?.departments, 'Departments'],
    [this.data()?.title, 'Title'],
    [this.data()?.message, 'Message'],
    [this.data()?.timestamp.toDate().toISOString().toString(), 'Created'],
    [this.data()?.id, 'Id'],
  ])

  // - odpowiedz , przekaz ,  
  toggleFavourites() {
    this.favouritesHandler.emit()
  }
}
