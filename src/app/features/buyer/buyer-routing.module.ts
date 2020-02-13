import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BuyerHomeComponent } from 'app/features/buyer/component/buyer-home/buyer-home.component';

const routes: Routes = [
  {
    path: '',
    component: BuyerHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule {
}
