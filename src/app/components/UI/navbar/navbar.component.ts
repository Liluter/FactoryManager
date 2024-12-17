import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1"><ng-content ></ng-content>
    </span>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        @for(link of links; track link){
        <li class="nav-item">
          <a class="nav-link" href="#">{{link}}</a>
        </li>
        }
      </ul>
    </div>
  </div>
  </nav>
  `,
  standalone: true
})
export class NavbarComponent implements OnInit {
  @Input() links: string[] = []

  ngOnInit(): void { }
}
