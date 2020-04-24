import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { ShopComponent } from 'features/buyer/views/shop/shop.component';
import { BuyerRoutingModule } from 'features/buyer/buyer-routing.module';
import { MyOrdersComponent } from 'features/buyer/views/my-orders/my-orders.component';

@NgModule({
  imports: [
      SharedModule,
      BuyerRoutingModule
  ],
  declarations: [
      ShopComponent,
      MyOrdersComponent
  ]
})
export class BuyerModule {
}
