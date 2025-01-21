import { Component } from '@angular/core';
import { AvatarImageComponent } from '../../components/UI/avatar-image/avatar-image.component';

@Component({
  selector: 'app-worker-page',
  standalone: true,
  imports: [AvatarImageComponent],
  templateUrl: './worker.page.html',
  styleUrl: './worker.page.scss'
})
export class WorkerPage {

}
