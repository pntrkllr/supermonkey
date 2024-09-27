import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarContrasenaPage } from './modificar-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarContrasenaPageRoutingModule {}
