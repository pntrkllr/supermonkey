import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})

export class ProductosPage implements OnInit {

  nom_usuario: string = "";
  contrasena: string = "";
  rolUsuario: string | null = null;

  arregloProductos: any = [{
    id_producto: '',
    nombre_pr: '',
    cantidad_kg: '',
    stock: '',
    foto: '',
    precio: ''
  }]

  constructor(private router: Router, private activedroute: ActivatedRoute, private bd: ServicebdService) { 
    addIcons({ library, playCircle, radio, search });

    this.activedroute.queryParams.subscribe(param =>{

      if(this.router.getCurrentNavigation()?.extras.state){

        this.contrasena = this.router.getCurrentNavigation()?.extras?.state?.['con'];
        this.nom_usuario = this.router.getCurrentNavigation()?.extras?.state?.['user'];
        
      }
    });
   }

   ngOnInit() {

    this.rolUsuario = localStorage.getItem('id_rol');

    //verificar si la BD esta lista
    this.bd.dbState().subscribe(res=>{
      if(res){
        this.bd.fetchProductos().subscribe(data=>{
          this.arregloProductos = data;
        })
      }
    })
  }
  modificar(x:any){
    let navigationExtras: NavigationExtras = {
      state: {
        producto: x
      }
    }
    this.router.navigate(['/editar-producto'], navigationExtras);
  }

  eliminar(x:any){
    this.bd.eliminarProducto(x.id_producto);
  }

}
