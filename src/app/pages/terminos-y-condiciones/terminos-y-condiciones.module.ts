import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerminosYCondicionesPageRoutingModule } from './terminos-y-condiciones-routing.module';

import { TerminosYCondicionesPage } from './terminos-y-condiciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerminosYCondicionesPageRoutingModule
  ],
  declarations: [TerminosYCondicionesPage]
})
export class TerminosYCondicionesPageModule {}
