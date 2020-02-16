import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { BuyerHomeComponent } from 'features/buyer/component/buyer-home/buyer-home.component';
import { BuyerRoutingModule } from 'features/buyer/buyer-routing.module';

@NgModule({
  imports: [
    SharedModule,
    BuyerRoutingModule
  ],
  declarations: [
    BuyerHomeComponent
  ]
})
export class BuyerModule {
}
