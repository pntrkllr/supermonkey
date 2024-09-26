import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialCompraPageRoutingModule } from './historial-compra-routing.module';

import { HistorialCompraPage } from './historial-compra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialCompraPageRoutingModule
  ],
  declarations: [HistorialCompraPage]
})
export class HistorialCompraPageModule {}
