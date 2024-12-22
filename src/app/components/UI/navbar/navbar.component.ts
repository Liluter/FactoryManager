import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [RouterModule]
})
export class NavbarComponent implements OnInit {
  @Input() links: string[] = []

  ngOnInit(): void { }
}
