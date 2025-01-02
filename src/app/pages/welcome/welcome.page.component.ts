import { Component, inject, Input, OnInit } from '@angular/core';
import { CalendarSheetComponent } from '../../components/UI/calendar-sheet/calendar-sheet.component';
import { first, interval, map, Observable, startWith } from 'rxjs';
import { FSUser } from '../../types/auth.interface';
import { UserService } from '../../services/user.service';
import { AsyncPipe } from '@angular/common';

const quotes = [
  {
    author: 'Paul J. Meyer',
    quote: 'Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort.'
  },
  {
    author: 'Bruce Lee',
    quote: 'I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.'
  },
  {
    author: 'BruceLee',
    quote: 'If you spend too much time thinking about a thing, you\'ll never get it done.'
  },
  {
    author: 'Rosabeth Moss Kanter',
    quote: 'I\'ve found that small wins, small projects, small differences often make huge differences.'
  },
  {
    author: 'Sam Walton',
    quote: 'Celebrate your successes. Find some humor in your failures.'
  },
  {
    author: 'Paulo Coelho',
    quote: 'The great victory, which appears so simple today, was the result of a series of small victories that went unnoticed.'
  },
  {
    author: 'Tim Ferriss',
    quote: 'Focus on being productive instead of busy.'
  },
  {
    author: 'Peter Drucker',
    quote: 'What gets measured gets managed.'
  },
  {
    author: 'Stephen King',
    quote: 'Amateurs sit and wait for inspiration, the rest of us just get up and go to work.'
  },
]
@Component({
  selector: 'welcome-page',
  templateUrl: './welcome.page.component.html',
  styleUrls: ['./welcome.page.component.scss'],
  standalone: true,
  imports: [CalendarSheetComponent, AsyncPipe]
})
export class WelcomePageComponent {
  userService: UserService = inject(UserService);
  quotes = quotes
  user$: Observable<string | undefined> = this.userService.getloggedInUser().pipe(map(user => user?.username))
  randomQuotes$ = interval(10000).pipe(
    startWith(Math.floor(Math.random() * this.quotes.length)),
    map(() => this.quotes[Math.floor(Math.random() * this.quotes.length)])
  )
  constructor() { }

}
