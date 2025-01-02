import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-sheet',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './calendar-sheet.component.html',
  styleUrl: './calendar-sheet.component.scss'
})
export class CalendarSheetComponent {
  today: Date = new Date
  dayOfWeek = this.today.getDay()
  tillWeekend(): string {
    const tillWeekendNumber = 5 - this.dayOfWeek
    let message;
    if (tillWeekendNumber === 1) {
      message = 'Till weekend left only ' + tillWeekendNumber + ' day.'
    } else {
      message = 'Till weekend left ' + tillWeekendNumber + ' days.'

    }
    return message
  }
}
