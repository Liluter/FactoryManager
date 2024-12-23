import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [RouterModule]
})
export class NavbarComponent {
  @Input() links: string[] = ['login']
}
