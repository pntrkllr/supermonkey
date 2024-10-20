import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit {
  
  productoM: any;
  foto: any | null = null;

  nombrePrTocado: boolean = false;
  pesoTocado: boolean = false;
  precioTocado: boolean = false;
  categoriaTocada: boolean = false;

  constructor(private router: Router, private activerouter: ActivatedRoute, private bd: ServicebdService) { 
    this.activerouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.productoM = this.router.getCurrentNavigation()?.extras?.state?.['producto'];
        this.foto = this.productoM.foto; // Inicializa con la foto existente
      }
    });
  }

  ngOnInit() {

  }

  modificar() {

    this.bd.editarProducto(
      this.productoM.id_producto,
      this.productoM.nombre_pr,
      this.productoM.cantidad_kg,
      this.productoM.precio,
      this.productoM.stock,
      this.foto,
      this.productoM.estatus,
      this.productoM.id_categoria
    );
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    this.foto = image.webPath;
  };
}

