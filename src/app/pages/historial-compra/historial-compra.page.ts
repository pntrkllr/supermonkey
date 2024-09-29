import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-compra',
  templateUrl: './historial-compra.page.html',
  styleUrls: ['./historial-compra.page.scss'],
})
export class HistorialCompraPage implements OnInit {

  usuario: string = "";
  contrasena: string = "";

  constructor() { }

  ngOnInit() {
  }

}
