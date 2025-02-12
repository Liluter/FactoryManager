import { Injectable } from '@angular/core';
import { BranchDataModel } from '../types/data.interface';

@Injectable({
  providedIn: 'root'
})
export class BranchDataService {
  branchDataMockup: BranchDataModel[] = [
    {
      branchTitle: 'workshop',
      notifications: 2,
      lastnotification: 154,
      tasks: {
        activeTasks: [{ name: 'Build Logo', content: { description: '160 x 480 logo for Tesco', files: '' }, taskId: '000002', createdAt: '13-12-2024 10:11' },
        { name: 'Build Logo', content: { description: '160 x 480 logo for Tesco', files: '' }, taskId: '000002', createdAt: '13-12-2024 10:11' },
        { name: 'Build Logo', content: { description: '160 x 480 logo for Tesco', files: '' }, taskId: '000002', createdAt: '13-12-2024 10:11' }

        ],
        activeTasksLength: 1,
        pastTasks: [{ name: 'Banner preparation', content: { description: '240 x 240 banner for Nike', files: '' }, taskId: '000001', createdAt: '13-12-2024 09:05' }],
        pastTasksLength: 1
      },
      workers: [
        { name: 'mirek', uid: '123123', workingDay: 8, hoursWorked: 1, avatarID: '0' },
        { name: 'staszek', uid: '123123', workingDay: 8, hoursWorked: 2, avatarID: '3' },
        { name: 'janek', uid: '123123', workingDay: 12, hoursWorked: 6, avatarID: '4' },
        { name: 'marek', uid: '123123', workingDay: 8, hoursWorked: 8, avatarID: '5' },
      ],
      messages: {
        unread: [
          { author: 'karol', message: 'Welcome new employers', createdAt: '12-12-2024 13:43', read: false, id: '1' },
          { author: 'karol', message: 'Welcome new employers', createdAt: '12-12-2024 13:44', read: false, id: '1' },
          { author: 'mirek', message: 'Wrong parts', createdAt: '12-12-2024 13:43', read: true, id: '2' },
          { author: 'ania', message: 'Where is projecgt of new part.', createdAt: '12-13-2024 10:43', read: false, id: '3' },
        ],
        read: [
          { author: 'karol', message: 'Welcome new employers', createdAt: '12-12-2024 13:43', read: false, id: '1' },
          { author: 'mirek', message: 'Wrong parts', createdAt: '12-12-2024 13:43', read: true, id: '2' },
          { author: 'ania', message: 'Where is projecgt of new part.', createdAt: '12-13-2024 10:43', read: false, id: '3' },
        ]
      }
    },
    {
      branchTitle: 'warehouse',
      notifications: 3,
      lastnotification: 12,
      tasks: {
        activeTasks: [{ name: 'Order tape', content: { description: '50 pcs. of masking tape', files: '' }, taskId: '000020', createdAt: '13-12-2024 10:11' }],
        activeTasksLength: 1,
        pastTasks: [{ name: 'Order metal', content: { description: '20x30 4m rectangle alu profiles 45 pcs.', files: '' }, taskId: '000010', createdAt: '13-12-2024 09:05' }],
        pastTasksLength: 1
      },
      workers: null,
      messages: {
        unread: [{ author: 'karol', message: 'new employee ...', createdAt: '07-22-2024 13:43', read: false, id: '4' }, { author: 'ania', message: 'invitation ...', createdAt: '07-22-2024 13:43', read: true, id: '5' }],
        read: []
      }
    },
    {
      branchTitle: 'outside jobs',
      notifications: 1,
      lastnotification: 4,
      tasks: {
        activeTasks: [{ name: 'Logo montage', content: { description: '160 x 480 logo for Tesco', files: '' }, taskId: '000002', createdAt: '13-12-2024 10:11' },
        ],
        activeTasksLength: 1,
        pastTasks: [{ name: 'Demontage Montage preparation', content: { description: '240 x 240 banner for Nike', files: '' }, taskId: '000001', createdAt: '13-12-2024 09:05' }],
        pastTasksLength: 1
      },
      workers: [{ name: 'mirek', uid: '123123', workingDay: 8, hoursWorked: 5, avatarID: '3' }],
      messages: {
        unread: [{ author: 'karol', message: 'Welcome new employers', createdAt: '12-12-2024 13:43', read: false, id: '6' },
        { author: 'mirek', message: 'Wrong parts', createdAt: '12-12-2024 13:43', read: true, id: '7' },
        { author: 'ania', message: 'Where is projecgt of new part.', createdAt: '12-13-2024 10:43', read: false, id: '8' },],
        read: []
      }
    },
    {
      branchTitle: 'hr',
      notifications: 4,
      lastnotification: 32,
      tasks: {
        activeTasks: [{ name: 'Prepare agreement', content: { description: 'Agreement for new...', files: '' }, taskId: '000002', createdAt: '13-12-2024 10:11' }],
        activeTasksLength: 1,
        pastTasks: [{ name: 'test job 1', content: { description: 'New job task 1', files: '' }, taskId: '000001', createdAt: '13-12-2024 09:05' }],
        pastTasksLength: 1
      },
      workers: null,
      messages: {
        unread: [],
        read: [{ author: 'karol', message: 'Welcome new ...', createdAt: '12-25-2024 13:43', read: true, id: '9' },
        { author: 'ania', message: 'Done new ...', createdAt: '12-26-2024 15:43', read: false, id: '10' },
        { author: 'mirek', message: 'Send ...', createdAt: '12-27-2024 11:43', read: true, id: '11' },]
      }
    },
    {
      branchTitle: 'marketing',
      notifications: 2,
      lastnotification: 72,
      tasks: {
        activeTasks: [{ name: 'Make offer', content: { description: 'Castorama logo', files: '' }, taskId: '000300', createdAt: '13-12-2024 10:11' }],
        activeTasksLength: 1,
        pastTasks: [{ name: 'Send recipee', content: { description: 'Nike logo', files: '' }, taskId: '000400', createdAt: '13-12-2024 09:05' }],
        pastTasksLength: 1
      },
      workers: null,
      messages: {
        unread:
          [{ author: 'karol', message: 'where can I find...', createdAt: '12-12-2024 13:43', read: false, id: '12' }]
        ,
        read: []
      }
    },
  ]
}
