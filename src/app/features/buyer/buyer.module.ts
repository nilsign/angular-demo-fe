import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { ShopComponent } from 'features/buyer/component/shop/shop.component';
import { BuyerRoutingModule } from 'features/buyer/buyer-routing.module';

@NgModule({
  imports: [
    SharedModule,
    BuyerRoutingModule
  ],
  declarations: [
    ShopComponent
  ]
})
export class BuyerModule {
}
