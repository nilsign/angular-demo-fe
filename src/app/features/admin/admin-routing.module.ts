import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from 'features/admin/component/dasboard/dashboard.component';
import { ShowUsersComponent } from 'features/admin/component/show-users/show-users.component';
import { CreateUserComponent } from 'features/admin/component/create-user/create-user.component';
import { EditUserComponent } from 'features/admin/component/edit-user/edit-user.component';
import { SettingsComponent } from 'features/admin/component/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'show-users',
    component: ShowUsersComponent
  },
  {
    path: 'create-user',
    component: CreateUserComponent
  },
  {
    path: 'edit-user',
    component: EditUserComponent
  }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes)
  ],
  exports: [
      RouterModule
  ]
})
export class AdminRoutingModule {
}
