import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from 'shared/components/menu-bar/menu-bar.component';
import { SpinnerComponent } from 'shared/components/spinner/spinner.component';
import { AdminMenuBarItemsComponent } from './components/menu-bar/admin-menu-bar-items/admin-menu-bar-items.component';
import { SellerMenuBarItemsComponent } from './components/menu-bar/seller-menu-bar-items/seller-menu-bar-items.component';
import { BuyerMenuBarItemsComponent } from './components/menu-bar/buyer-menu-bar-items/buyer-menu-bar-items.component';
import { ActiveRoleSelectorComponent } from './components/menu-bar/active-role-selector/active-role-selector.component';

@NgModule({
  imports: [
      CommonModule,
      HttpClientModule
  ],
  exports: [
      CommonModule,
      MenuBarComponent,
      SpinnerComponent
  ],
  declarations: [
      MenuBarComponent,
      ActiveRoleSelectorComponent,
      AdminMenuBarItemsComponent,
      SellerMenuBarItemsComponent,
      BuyerMenuBarItemsComponent,
      SpinnerComponent
  ]
})
export class SharedModule {
}
