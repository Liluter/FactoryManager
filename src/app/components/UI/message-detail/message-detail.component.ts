import { Component, input } from '@angular/core';

@Component({
  selector: 'app-message-detail',
  standalone: true,
  imports: [],
  templateUrl: './message-detail.component.html',
  styleUrl: './message-detail.component.scss'
})
export class MessageDetailComponent {
  id = input<string>()

  // pobrać dane z servisu wiadomości na podstawie id . Get one by ID. i wyświetlić 
  // opcje tytuł , content, 
  // odpowiedz , przekaz , 
  // jako card plus form
}
