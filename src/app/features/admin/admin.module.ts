import { NgModule } from '@angular/core';
import { AdminRoutingModule } from 'features/admin/admin-routing.module';
import { AdminHomeComponent } from 'features/admin/component/admin-home/admin-home.component';
import { SharedModule } from 'shared/shared.module';
import { UserManagementComponent } from './component/user-management/user-management.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminHomeComponent,
    UserManagementComponent
  ]
})
export class AdminModule {
}
