import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})

export class AgregarProductoPage implements OnInit {

  form!: FormGroup;

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
  categoriaTocada: boolean = false;

  constructor(private bd: ServicebdService, private fb: FormBuilder) { }

  ngOnInit() {
    // this.form = this.fb.group({
    //   nombre_pr: [this.nombre_pr, [Validators.required]],
    //   cantidad_kg: [this.cantidad_kg, [Validators.required]],
    //   precio: [this.precio, [Validators.required]],
    //   foto: [this.foto, [Validators.required]],
    //   id_categoria: [this.id_categoria, [Validators.required]]
    // });
   }

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

  //metodos para evaluar los inputs del formulario

  //nombre producto

  // isNombrePrInvalid() {
  //   const control = this.form.get('nombre_pr');
  //   return control?.touched && control.invalid;
  // }

  // getNombrePrError() {
  //   const control = this.form.get('nombre_pr');
  //   if (control?.hasError('required')) {
  //     return 'El nombre no puede estar vacío.';
  //   }
  //   return '';
  // }

  // //peso
  // isPesoInvalid() {
  //   const control = this.form.get('cantidad_kg');
  //   return control?.touched && control.invalid;
  // }

  // getPesoError() {
  //   const control = this.form.get('cantidad_kg');
  //   if (control?.hasError('required')) {
  //     return 'El peso (kg) no puede estar vacío.';
  //   }
  //   return '';
  // }

  //precio
  // isPrecioInvalid() {
  //   const control = this.form.get('precio');
  //   return control?.touched && control.invalid;
  // }

  // getPrecioError() {
  //   const control = this.form.get('precio');
  //   if (control?.hasError('required')) {
  //     return 'El precio no puede estar vacío.';
  //   }
  //   return '';
  // }

  // //categoria
  // isCategoriaInvalid() {
  //   const control = this.form.get('id_categoria');
  //   return control?.touched && control.invalid;
  // }

  // getCategoriaError() {
  //   const control = this.form.get('id_categoria');
  //   if (control?.hasError('required')) {
  //     return 'Debe escoger la categoría del producto.';
  //   }
  //   return '';
  // }

  //foto
  // isFotoInvalid() {
  //   const control = this.form.get('imagen');
  //   return control?.touched && control.invalid;
  // }

  // getFotoError() {
  //   const control = this.form.get('imagen');
  //   if (control?.hasError('required')) {
  //     return 'Debe seleccionar una foto.';
  //   }
  //   return '';
  // }

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
