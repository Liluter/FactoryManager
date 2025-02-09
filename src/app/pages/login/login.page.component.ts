import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginFormComponent } from "../../components/UI/login-form/login-form.component";

@Component({
  selector: 'login-page',
  templateUrl: './login.page.component.html',
  styleUrls: ['./login.page.component.scss'],
  standalone: true,
  imports: [LoginFormComponent]
})
export class LoginPageComponent implements OnInit {

  ngOnInit(): void { }
}
