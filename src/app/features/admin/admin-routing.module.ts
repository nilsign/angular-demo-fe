import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from 'features/admin/views/dasboard/dashboard.component';
import { ShowUsersComponent } from 'features/admin/views/show-users/show-users.component';
import { CreateUserComponent } from 'features/admin/views/create-user/create-user.component';
import { EditUserComponent } from 'features/admin/views/edit-user/edit-user.component';
import { SettingsComponent } from 'features/admin/views/settings/settings.component';

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
