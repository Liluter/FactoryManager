import { Component, OnInit } from '@angular/core';
import { CalendarSheetComponent } from '../../components/UI/calendar-sheet/calendar-sheet.component';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome.page.component.html',
  styleUrls: ['./welcome.page.component.scss'],
  standalone: true,
  imports: [CalendarSheetComponent]
})
export class WelcomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
