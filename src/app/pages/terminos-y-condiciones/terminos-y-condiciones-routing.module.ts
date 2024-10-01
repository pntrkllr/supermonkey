import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerminosYCondicionesPage } from './terminos-y-condiciones.page';

const routes: Routes = [
  {
    path: '',
    component: TerminosYCondicionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerminosYCondicionesPageRoutingModule {}
