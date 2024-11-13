import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})

export class AgregarProductoPage implements OnInit {

  nombre_pr!: string;
  cantidad_kg!: number;
  precio!: number;
  stock!: number;
  foto!: Blob;
  estatus!: string;
  id_categoria!: number;

  imagen: any;

  nombrePrTocado: boolean = false;
  pesoTocado: boolean = false;
  precioTocado: boolean = false;
  stockTocado: boolean = false;
  categoriaTocada: boolean = false;

  constructor(private bd: ServicebdService) { }

  ngOnInit() { }

   validarEstatus() {
    if (this.stock === undefined || this.stock <= 0) {
      this.estatus = 'No disponible';
    } else {
      this.estatus = 'Disponible';
    }
  }

  crear() {
    this.validarEstatus();
    this.bd.insertarProducto(this.nombre_pr, this.cantidad_kg, this.precio, this.stock, this.imagen, this.estatus, this.id_categoria);
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.imagen = image.webPath;
  
    
  };

}
