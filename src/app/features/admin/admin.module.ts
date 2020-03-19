import { NgModule } from '@angular/core';
import { AdminRoutingModule } from 'features/admin/admin-routing.module';
import { SharedModule } from 'shared/shared.module';
import { ShowUsersComponent } from 'features/admin/component/show-users/show-users.component';
import { DashboardComponent } from 'features/admin/component/dasboard/dashboard.component';
import { CreateUserComponent } from 'features/admin/component/create-user/create-user.component';
import { EditUserComponent } from 'features/admin/component/edit-user/edit-user.component';
import { SettingsComponent } from 'features/admin/component/settings/settings.component';

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
      EditUserComponent
  ]
})
export class AdminModule {
}
