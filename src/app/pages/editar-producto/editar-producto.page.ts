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
  
  productoM : any;
  foto : any;

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
    this.bd.editarProducto(this.productoM.id_producto, this.productoM.nombre_pr, this.productoM.cantidad_kg, this.productoM.precio, this.productoM.stock, this.foto, this.productoM.estatus, this.productoM.id_categoria)
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.foto = image.webPath;
  
    
  };

}
