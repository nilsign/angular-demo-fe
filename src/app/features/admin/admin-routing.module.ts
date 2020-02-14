import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminHomeComponent } from 'features/admin/component/admin-home/admin-home.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
