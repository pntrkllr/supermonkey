import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreguntaSeguridadPage } from './pregunta-seguridad.page';

const routes: Routes = [
  {
    path: '',
    component: PreguntaSeguridadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntaSeguridadPageRoutingModule {}
