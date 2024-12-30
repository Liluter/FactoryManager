import { Component } from '@angular/core';
import { NewUserFormComponent } from '../../components/UI/newuser-form/newuser-form..component';

@Component({
  selector: 'create-user-page',
  standalone: true,
  imports: [NewUserFormComponent],
  templateUrl: './create-user-page.component.html',
  styleUrl: './create-user-page.component.scss'
})
export class CreateUserPageComponent {

}
