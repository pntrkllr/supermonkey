import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarProductoPage } from './agregar-producto.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarProductoPageRoutingModule {}
