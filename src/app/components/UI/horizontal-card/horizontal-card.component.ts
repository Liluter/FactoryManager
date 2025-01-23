import { Component } from '@angular/core';
import { AvatarImageComponent } from "../avatar-image/avatar-image.component";

@Component({
  selector: 'app-horizontal-card',
  standalone: true,
  imports: [AvatarImageComponent],
  templateUrl: './horizontal-card.component.html',
  styleUrl: './horizontal-card.component.scss'
})
export class HorizontalCardComponent {

}
