import { Routes } from '@angular/router';
import { UserPageComponent } from './pages/user/user.page.component';
import { LoginPageComponent } from './pages/login/login.page.component';
import { WelcomePageComponent } from './pages/welcome/welcome.page.component';
import { CreateUserPageComponent } from './pages/create-user/create-user-page.component';
import { DashboardPage } from './pages/dashboard-page/dashboard.page';
import { MessagePage } from './pages/message/message.page';
import { WorkshopPage } from './pages/workshop/workshop.page';
import { WorkerPage } from './pages/worker/worker.page';
import { MailboxPage } from './pages/mailbox/mailbox.page';
import { TaskPage } from './pages/task-page/task.page';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'login'
  },
  {
    path: 'welcome',
    component: WelcomePageComponent,
    title: 'Welcome'
  },
  {
    path: 'dashboard',
    component: DashboardPage,
    title: 'Dashboard'
  },
  {
    path: 'logout',
    redirectTo: 'login'
  },
  {
    path: 'user',
    component: UserPageComponent,
  },
  {
    path: 'user/create',
    component: CreateUserPageComponent,
  },
  {
    path: 'workshop',
    component: WorkshopPage,
  },
  {
    path: 'message/:id',
    component: MessagePage,
    title: 'Message'
  },
  {
    path: 'worker/:id',
    component: WorkerPage
  },
  {
    path: 'mailbox/:workerId',
    component: MailboxPage
  },
  {
    path: 'mailbox',
    component: MailboxPage
  },
  {
    path: 'task/:id',
    component: TaskPage
  }

  // {
  //   path: 'add/task',
  //   component: AddTaskPageComponent
  // },
  // {
  //   path: 'add/project',
  //   component: AddProjectPageComponent
  // },
  // {
  //   path: 'add/label',
  //   component: AddLabelPageComponent
  // },
  // {
  //   path: 'tasks/uncompleted',
  //   component: UncompletedPageComponent
  // },
  // {
  //   path: 'tasks/completed',
  //   component: CompletedPageComponent
  // },
  // {
  //   path: 'tasks/all',
  //   component: AllPageComponent
  // },
  // {
  //   path: 'projects',
  //   component: ProjectsPageComponent
  // },
  // {
  //   path: 'project/details/:id',
  //   component: ProjectDetailComponent
  // },
  // {
  //   path: 'project/edit/:id',
  //   component: ProjectEditCompoennt
  // },
  // {
  //   path: 'labels',
  //   component: LabelsPageCompoent
  // },
  // {
  //   path: 'label/details/:id',
  //   component: LabelDetailsComponent
  // },
  // {
  //   path: 'label/edit/:id',
  //   component: LabelEditComponent
  // },
  // {
  //   path: 'detail/:id',
  //   component: DetailComponent
  // },
  // {
  //   path: 'edit/:id',
  //   component: EditComponent
  // }
];
