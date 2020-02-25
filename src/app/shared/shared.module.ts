import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from 'shared/components/menu-bar/menu-bar.component';
import { SpinnerComponent } from 'shared/components/spinner/spinner.component';

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
      SpinnerComponent
  ]
})
export class SharedModule {
}
