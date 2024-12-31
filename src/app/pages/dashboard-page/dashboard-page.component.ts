import { Component } from '@angular/core';
import { CardWidgetComponent } from "../../components/UI/card-widget/card-widget.component";

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CardWidgetComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

}
