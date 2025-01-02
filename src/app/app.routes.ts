import { Routes } from '@angular/router';
import { UserPageComponent } from './pages/user/user.page.component';
import { LoginPageComponent } from './pages/login/login.page.component';
import { WelcomePageComponent } from './pages/welcome/welcome.page.component';
import { CreateUserPageComponent } from './pages/create-user/create-user-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { WorkshopPageComponent } from './pages/workshop-page/workshop-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'welcome',
    component: WelcomePageComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
  },
  {
    path: 'logout',
    redirectTo: 'login'
  },
  {
    path: 'create-user',
    component: CreateUserPageComponent,
  },
  {
    path: 'user',
    component: UserPageComponent,
  },
  {
    path: 'workshop',
    component: WorkshopPageComponent,
  },
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
