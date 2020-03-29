import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuBarComponent } from 'shared/components/menu-bar/menu-bar.component';
import { AdminMenuBarItemsComponent } from 'shared/components/menu-bar/admin-menu-bar-items/admin-menu-bar-items.component';
import { SellerMenuBarItemsComponent } from 'shared/components/menu-bar/seller-menu-bar-items/seller-menu-bar-items.component';
import { BuyerMenuBarItemsComponent } from 'shared/components/menu-bar/buyer-menu-bar-items/buyer-menu-bar-items.component';
import { ActiveRoleSelectorComponent } from 'shared/components/menu-bar/active-role-selector/active-role-selector.component';
import { SpinnerComponent } from 'shared/components/spinner/spinner.component';
import { InputTextComponent } from 'shared/components/input/input-text/input-text.component';
import { InputCheckboxComponent } from 'shared/components/input/input-checkbox/input-checkbox.component';
import { FieldLabelComponent } from 'shared/components/input/field-label/field-label.component';
import { FieldInfoComponent } from 'shared//components/input/field-info/field-info.component';
import { InputContainerComponent } from './components/input/input-container/input-container.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faUser } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  exports: [
      CommonModule,
      ReactiveFormsModule,
      FontAwesomeModule,
      MenuBarComponent,
      SpinnerComponent,
      InputContainerComponent,
      InputTextComponent,
      InputCheckboxComponent
  ],
  declarations: [
      MenuBarComponent,
      ActiveRoleSelectorComponent,
      AdminMenuBarItemsComponent,
      SellerMenuBarItemsComponent,
      BuyerMenuBarItemsComponent,
      SpinnerComponent,
      FieldInfoComponent,
      FieldLabelComponent,
      InputContainerComponent,
      InputTextComponent,
      InputCheckboxComponent
  ]
})
export class SharedModule {
  constructor(private library: FaIconLibrary) {
    // Defines a set of usable Font Awesome icons.
    library.addIcons(
        faEdit,
        faUser
    );
  }
}
