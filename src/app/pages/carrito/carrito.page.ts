import { Component, OnInit } from '@angular/core';
import { ServicealertService } from 'src/app/services/servicealert.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  totalCarro !: number;

  arregloCarrito: any = [{
    id_producto: '',
    nombre_pr: '',
    cantidad_kg: '',
    stock: '',
    foto: '',
    precio: '',
    subtotal: '',
    cantidad: ''
  }]

  constructor( private alert: ServicealertService, private bd : ServicebdService) { }

  ngOnInit() {

    this.bd.dbState().subscribe(res=>{
      if(res){
        this.bd.fetchCarrito().subscribe(data=>{
          this.arregloCarrito = data;
        })
        this.bd.fetchTotal().subscribe(data=>{
          this.totalCarro = data;
        })
      }
      
    })

    const id_usuario = Number(localStorage.getItem('id_usuario'))
    this.bd.verCarrito(id_usuario);
    this.bd.getTotal(id_usuario);

  }

  mas(id_producto : number){
    this.bd.masProducto(id_producto);
  }
  menos(id_producto : number){
    this.bd.menosProducto(id_producto);
  }
  eliminar(id_producto : number){
    this.bd.eliminarPcarrito(id_producto);
  }
  pagar(){
    const id_usuario = Number(localStorage.getItem('id_usuario'));
    this.bd.pagarProductos(id_usuario);
  }
}
