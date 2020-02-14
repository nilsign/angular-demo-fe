import { NgModule } from '@angular/core';
import { AdminRoutingModule } from 'features/admin/admin-routing.module';
import { AdminHomeComponent } from 'features/admin/component/admin-home/admin-home.component';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminHomeComponent
  ]
})
export class AdminModule {
}
