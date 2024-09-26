import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarProductoPageRoutingModule } from './agregar-producto-routing.module';

import { AgregarProductoPage } from './agregar-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarProductoPageRoutingModule
  ],
  declarations: [AgregarProductoPage]
})
export class AgregarProductoPageModule {}
