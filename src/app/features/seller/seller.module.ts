import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { SellerRoutingModule } from 'features/seller/seller-routing.module';
import { SellerHomeComponent } from 'features/seller/components/seller-home/seller-home.component';

@NgModule({
  imports: [
    SharedModule,
    SellerRoutingModule
  ],
  declarations: [
    SellerHomeComponent
  ]
})
export class SellerModule {
}
