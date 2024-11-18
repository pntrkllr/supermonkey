import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';
import { ServicealertService } from 'src/app/services/servicealert.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})

export class ProductosPage implements OnInit {

  nom_usuario: string = "";
  contrasena: string = "";
  rolUsuario: string | null = null;
  id_user:number = 0;
  recetas: any[] = [];
  traducciones: string[] = [];


  arregloProductos: any = [{
    id_producto: '',
    nombre_pr: '',
    cantidad_kg: '',
    stock: '',
    foto: '',
    precio: ''
  }]

  //arreglo de filtros
  productosFiltrados: any = [];

  constructor(private api: ApiService, private router: Router, private activedroute: ActivatedRoute, private bd: ServicebdService, private alert: ServicealertService) {
    addIcons({ library, playCircle, radio, search });

    this.activedroute.queryParams.subscribe(param => {

      if (this.router.getCurrentNavigation()?.extras.state) {

        this.contrasena = this.router.getCurrentNavigation()?.extras?.state?.['con'];
        this.nom_usuario = this.router.getCurrentNavigation()?.extras?.state?.['user'];

      }
    });
  }

  ngOnInit() {

    this.loadProductos();
  
    this.id_user = Number(localStorage.getItem('id_usuario'));
    this.rolUsuario = localStorage.getItem('id_rol');
  
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchProductos().subscribe(data => {
          this.arregloProductos = data;
          this.productosFiltrados = this.arregloProductos;
          this.bd.getProductos();
        });
      }
    });
  
    this.bd.getProductos();
  }
  
  //vibración para botones del carrito
  async triggerHeavyHaptic() {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  }

  //filtrar productos
  filtrarProductos(event: any) {
    const categoriaSeleccionada = event.detail.value;

    if (categoriaSeleccionada === 'todos') {
      this.productosFiltrados = this.arregloProductos;
    } else {
      this.productosFiltrados = this.arregloProductos.filter((producto: any) =>
        producto.id_categoria === Number(categoriaSeleccionada)
      );
    }
  }


  agregarCarrito(id_producto: number) {
    const id_usuario = Number(localStorage.getItem('id_usuario'))
    this.bd.carrito(id_usuario, id_producto)
  }

  modificar(x: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        producto: x
      }
    }
    this.router.navigate(['/editar-producto'], navigationExtras);
  }

  deshabilitar(x: any) {
    this.bd.deshabilitarProducto(x.id_producto);
  }

  loadProductos() {
    this.api.getProductos().subscribe(response => {
      this.recetas = response['results'];
      this.translateTitles();
    });
  }

  translateTitles() {
    this.recetas.forEach(producto => {
      this.api.translateText(producto.title, 'ES').subscribe(translatedResponse => {
        this.traducciones.push(translatedResponse.translations[0].text);
      });
    });
  }

  usuario() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.nom_usuario,
        con: this.contrasena
      }
    }

  }

  toHistory(){
    let navigationExtras: NavigationExtras = {
      state: {
        id : this.id_user
      }
    }
    this.router.navigate(['/historial-compra'],navigationExtras);
  }

}
