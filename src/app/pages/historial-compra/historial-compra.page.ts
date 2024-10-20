import { Component, OnInit } from '@angular/core';
import { ServicealertService } from 'src/app/services/servicealert.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-historial-compra',
  templateUrl: './historial-compra.page.html',
  styleUrls: ['./historial-compra.page.scss'],
})
export class HistorialCompraPage implements OnInit {

  historial : any = [{
    id_venta: '',
    total: '',
    id_estado: '',
    id_usuario: '',
    id_producto: '',
    cantidad: '',
    sub_total: '',
    producto_nombre: '',
    foto : ''
  }];


  constructor(private alert : ServicealertService,private bd : ServicebdService) { }

  ngOnInit() {
    this.bd.dbState().subscribe(res=>{
      if(res){
        this.bd.fetchHistorial().subscribe(data=>{
          this.historial= data;
        })
      }
    })

    const id_usuario = Number(localStorage.getItem('id_usuario'))
    this.bd.verHistorial(id_usuario);
  }
}
