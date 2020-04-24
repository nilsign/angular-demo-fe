import { NgModule } from '@angular/core';
import { AdminRoutingModule } from 'features/admin/admin-routing.module';
import { SharedModule } from 'shared/shared.module';
import { ShowUsersComponent } from 'features/admin/views/show-users/show-users.component';
import { DashboardComponent } from 'features/admin/views/dasboard/dashboard.component';
import { CreateUserComponent } from 'features/admin/views/create-user/create-user.component';
import { EditUserComponent } from 'features/admin/views/edit-user/edit-user.component';
import { SettingsComponent } from 'features/admin/views/settings/settings.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
      DashboardComponent,
      SettingsComponent,
      ShowUsersComponent,
      CreateUserComponent,
      EditUserComponent,
      UsersTableComponent,
      UserFormComponent
  ]
})
export class AdminModule {
}
