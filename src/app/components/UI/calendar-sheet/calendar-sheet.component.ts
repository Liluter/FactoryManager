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
      message = 'Just one day away from the weekend.'
    } else if (tillWeekendNumber === 0) {
      message = 'Just few hours away from the weekend.'
    } else if (tillWeekendNumber === -1 || tillWeekendNumber === 5) {
      message = 'It\'s weekend!!!'
    } else {
      message = 'Just ' + tillWeekendNumber + ' days away from the weekend.'
    }
    return message
  }
}
