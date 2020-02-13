import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import {SellerRoutingModule} from 'app/features/seller/seller-routing.module';
import {SellerHomeComponent} from 'app/features/seller/seller-home/seller-home.component';

@NgModule({
  imports: [
    SharedModule,
    SellerRoutingModule
  ],
  declarations: [
    SellerHomeComponent
  ],
})
export class SellerModule {
}
