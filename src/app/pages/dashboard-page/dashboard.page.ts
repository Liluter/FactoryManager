import { Component, inject } from '@angular/core';
import { CardWidgetComponent } from "../../components/UI/card-widget/card-widget.component";
import { BranchDataModel } from '../../types/data.interface';
import { CalendarSheetComponent } from "../../components/UI/calendar-sheet/calendar-sheet.component";
import { BranchDataService } from '../../services/branch-data.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CardWidgetComponent, CalendarSheetComponent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss'
})
export class DashboardPage {
  data: BranchDataService = inject(BranchDataService)
  branchData: BranchDataModel[] = this.data.branchDataMockup
  widgetData!: any

}
