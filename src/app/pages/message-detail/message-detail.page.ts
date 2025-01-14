import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageDetailComponent } from '../../components/UI/message-detail/message-detail.component';

@Component({
  standalone: true,
  imports: [RouterModule, MessageDetailComponent],
  templateUrl: './message-detail.page.html',
  styleUrl: './message-detail.page.scss'
})
export class MessageDetailPage {
  id = input<string>()
}
