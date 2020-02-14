import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SellerHomeComponent } from 'features/seller/components/seller-home/seller-home.component';

const routes: Routes = [
  {
    path: '',
    component: SellerHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule {
}
