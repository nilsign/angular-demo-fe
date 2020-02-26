import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShopComponent } from 'features/buyer/component/shop/shop.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent
  },
  {
    path: 'shop',
    component: ShopComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule {
}
