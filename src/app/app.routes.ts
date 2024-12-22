import { Routes } from '@angular/router';
import { UserPageComponent } from './pages/user/user.page.component';
import { LoginPageComponent } from './pages/login/login.page.component';
import { WelcomePageComponent } from './pages/welcome/welcome.page.component';

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
  {
    path: 'user',
    component: UserPageComponent,
  },
  // {
  //   path: 'detail/:id',
  //   component: DetailComponent
  // },
  // {
  //   path: 'edit/:id',
  //   component: EditComponent
  // }
];
