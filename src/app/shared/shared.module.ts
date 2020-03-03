import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from 'shared/components/menu-bar/menu-bar.component';
import { AdminMenuBarItemsComponent } from 'shared/components/menu-bar/admin-menu-bar-items/admin-menu-bar-items.component';
import { SellerMenuBarItemsComponent } from 'shared/components/menu-bar/seller-menu-bar-items/seller-menu-bar-items.component';
import { BuyerMenuBarItemsComponent } from 'shared/components/menu-bar/buyer-menu-bar-items/buyer-menu-bar-items.component';
import { ActiveRoleSelectorComponent } from 'shared/components/menu-bar/active-role-selector/active-role-selector.component';
import { SpinnerComponent } from 'shared/components/spinner/spinner.component';
import { InputTextComponent } from './components/input/input-text/input-text.component';
import { InputCheckboxComponent } from './components/input/input-checkbox/input-checkbox.component';
import { FieldLabelComponent } from './components/input/field-label/field-label.component';
import { FieldInfoComponent } from './components/input/field-info/field-info.component';

@NgModule({
  imports: [
      CommonModule,
      HttpClientModule
  ],
  exports: [
      CommonModule,
      MenuBarComponent,
      SpinnerComponent,
      InputTextComponent
  ],
  declarations: [
      MenuBarComponent,
      ActiveRoleSelectorComponent,
      AdminMenuBarItemsComponent,
      SellerMenuBarItemsComponent,
      BuyerMenuBarItemsComponent,
      SpinnerComponent,
      InputTextComponent,
      InputCheckboxComponent,
      FieldLabelComponent,
      FieldInfoComponent
  ]
})
export class SharedModule {
}
