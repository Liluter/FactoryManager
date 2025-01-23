import { Component } from '@angular/core';
import { AvatarImageComponent } from '../../components/UI/avatar-image/avatar-image.component';
import { HorizontalCardComponent } from "../../components/UI/horizontal-card/horizontal-card.component";

@Component({
  selector: 'app-worker-page',
  standalone: true,
  imports: [AvatarImageComponent, HorizontalCardComponent],
  templateUrl: './worker.page.html',
  styleUrl: './worker.page.scss'
})
export class WorkerPage {

}
