import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(module => module.AdminModule)
  },
  {
    path: 'seller',
    loadChildren: () => import('./features/seller/seller.module').then(module => module.SellerModule)
  },
  {
    path: 'buyer',
    loadChildren: () => import('./features/buyer/buyer.module').then(module => module.BuyerModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
