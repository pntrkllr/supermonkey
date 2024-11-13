import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntaSeguridadPageRoutingModule } from './pregunta-seguridad-routing.module';

import { PreguntaSeguridadPage } from './pregunta-seguridad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreguntaSeguridadPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PreguntaSeguridadPage]
})
export class PreguntaSeguridadPageModule {}
