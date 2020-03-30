import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { SellerRoutingModule } from 'features/seller/seller-routing.module';
import { DashboardComponent } from 'features/seller/views/dashboard/dashboard.component';
import { ProductsComponent } from 'features/seller/views/products/products.component';

@NgModule({
  imports: [
      SharedModule,
      SellerRoutingModule
  ],
  declarations: [
      DashboardComponent,
      ProductsComponent
  ]
})
export class SellerModule {
}
