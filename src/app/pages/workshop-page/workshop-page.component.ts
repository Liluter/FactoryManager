import { Component, inject } from '@angular/core';
import { BranchDataService } from '../../services/branch-data.service';
import { DatePipe } from '@angular/common';
import { MediumAvatarComponent } from "../../components/UI/medium-avatar/medium-avatar.component";
import { BranchDataModel, Message } from '../../types/data.interface';

@Component({
  selector: 'app-workshop-page',
  standalone: true,
  imports: [DatePipe, MediumAvatarComponent],
  templateUrl: './workshop-page.component.html',
  styleUrl: './workshop-page.component.scss'
})
export class WorkshopPageComponent {
  service: BranchDataService = inject(BranchDataService)
  data = this.service.branchDataMockup.filter(el => el.branchTitle === 'workshop')[0]

  open(message: Message) {
    console.log(message)
  }
}
