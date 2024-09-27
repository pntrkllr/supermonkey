import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarContrasenaPageRoutingModule } from './modificar-contrasena-routing.module';

import { ModificarContrasenaPage } from './modificar-contrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarContrasenaPageRoutingModule
  ],
  declarations: [ModificarContrasenaPage]
})
export class ModificarContrasenaPageModule {}
