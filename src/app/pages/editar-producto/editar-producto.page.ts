import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit {
  productoM : any;

  constructor(private router: Router, private activerouter: ActivatedRoute, private bd: ServicebdService) { 
    this.activerouter.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.productoM = this.router.getCurrentNavigation()?.extras?.state?.['producto'];
      }
    })
  }
  ngOnInit() {
  }

  editar(){
    this.bd.editarProducto(this.productoM.id_producto, this.productoM.nombre_pr, this.productoM.cantidad_kg, this.productoM.precio, this.productoM.stock, this.productoM.foto, this.productoM.estatus, this.productoM.id_categoria)
  }
}
