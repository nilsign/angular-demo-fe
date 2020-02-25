import { NgModule } from '@angular/core';
import { AdminRoutingModule } from 'features/admin/admin-routing.module';
import { SharedModule } from 'shared/shared.module';
import { ShowUsersComponent } from './component/users/show-users.component';
import { DashboardComponent } from './component/dasboard/dashboard.component';
import { CreateUserComponent } from './component/create-user/create-user.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { SettingsComponent } from './component/settings/settings.component';

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
  ]
})
export class AdminModule {
}
