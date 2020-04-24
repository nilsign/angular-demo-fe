import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShopComponent } from 'features/buyer/views/shop/shop.component';
import { MyOrdersComponent } from 'features/buyer/views/my-orders/my-orders.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent
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
export class BuyerRoutingModule {
}
