import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'shared/guards/authentication.guard';
import { AdminAuthorizationGuard } from 'shared/guards/admin-authorization.guard';
import { SellerAuthorizationGuard } from 'shared/guards/seller-authorization.guard';
import { BuyerAuthorizationGuard } from 'shared/guards/buyer-authorization.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    canActivate: [AuthenticationGuard, AdminAuthorizationGuard],
    loadChildren: () => import('./features/admin/admin.module').then(module => module.AdminModule)
  },
  {
    path: 'seller',
    canActivate: [AuthenticationGuard, SellerAuthorizationGuard],
    loadChildren: () => import('./features/seller/seller.module').then(module => module.SellerModule)
  },
  {
    path: 'buyer',
    canActivate: [AuthenticationGuard, BuyerAuthorizationGuard],
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
