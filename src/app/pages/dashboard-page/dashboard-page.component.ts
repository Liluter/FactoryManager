import { Component } from '@angular/core';
import { CardWidgetComponent } from "../../components/UI/card-widget/card-widget.component";
import { BrnachDataModel } from '../../types/data.interface';

export const branchDataMockup: BrnachDataModel[] = [
  {
    branchTitle: 'workshop',
    notifications: 2,
    tasks: {
      activeTasks: [{ name: 'Build Logo', content: { description: '160 x 480 logo for Tesco', files: '' }, taskId: '000002', createdAt: '13-12-2024 10:11' },
      { name: 'Build Logo', content: { description: '160 x 480 logo for Tesco', files: '' }, taskId: '000002', createdAt: '13-12-2024 10:11' },
      { name: 'Build Logo', content: { description: '160 x 480 logo for Tesco', files: '' }, taskId: '000002', createdAt: '13-12-2024 10:11' }

      ],
      activeTasksLength: 1,
      pastTasks: [{ name: 'Banner preparation', content: { description: '240 x 240 banner for Nike', files: '' }, taskId: '000001', createdAt: '13-12-2024 09:05' }],
      pastTasksLength: 1
    },
    messeges: [{ author: 'karol', message: 'Welcome new employers', createdAt: '12-12-2024 13:43' }]
  },
  {
    branchTitle: 'warehouse',
    notifications: 3,
    tasks: {
      activeTasks: [{ name: 'Order tape', content: { description: '50 pcs. of masking tape', files: '' }, taskId: '000020', createdAt: '13-12-2024 10:11' }],
      activeTasksLength: 1,
      pastTasks: [{ name: 'Order metal', content: { description: '20x30 4m rectangle alu profiles 45 pcs.', files: '' }, taskId: '000010', createdAt: '13-12-2024 09:05' }],
      pastTasksLength: 1
    },
    messeges: [{ author: 'karol', message: 'new employee ...', createdAt: '07-22-2024 13:43' }, { author: 'ania', message: 'invitation ...', createdAt: '07-22-2024 13:43' }]
  },
  {
    branchTitle: 'hr',
    notifications: 4,
    tasks: {
      activeTasks: [{ name: 'Prepare agreement', content: { description: 'Agreement for new...', files: '' }, taskId: '000002', createdAt: '13-12-2024 10:11' }],
      activeTasksLength: 1,
      pastTasks: [{ name: 'test job 1', content: { description: 'New job task 1', files: '' }, taskId: '000001', createdAt: '13-12-2024 09:05' }],
      pastTasksLength: 1
    },
    messeges: [{ author: 'karol', message: 'Welcome new ...', createdAt: '12-25-2024 13:43' }]
  },
  {
    branchTitle: 'marketing',
    notifications: 2,
    tasks: {
      activeTasks: [{ name: 'Make offer', content: { description: 'Castorama logo', files: '' }, taskId: '000300', createdAt: '13-12-2024 10:11' }],
      activeTasksLength: 1,
      pastTasks: [{ name: 'Send recipee', content: { description: 'Nike logo', files: '' }, taskId: '000400', createdAt: '13-12-2024 09:05' }],
      pastTasksLength: 1
    },
    messeges: [{ author: 'karol', message: 'where can I find...', createdAt: '12-12-2024 13:43' }]
  },


]
@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CardWidgetComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
  branchData: BrnachDataModel[] = branchDataMockup
  widgetData!: any

}
