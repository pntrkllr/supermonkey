import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

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
  fotoUrl!: string; // Variable para almacenar la URL de la imagen
  estatus!: string;
  id_categoria!: number;

  constructor(private bd: ServicebdService, private router: Router) { }

  ngOnInit() { }

  crear() {
    this.validarEstatus();
    this.bd.insertarProducto(this.nombre_pr, this.cantidad_kg, this.precio, this.stock, this.foto, this.estatus, this.id_categoria);
  }

  validarEstatus() {
    if (this.stock === undefined || this.stock <= 0) {
      this.estatus = 'No disponible';
    } else {
      this.estatus = 'Disponible';
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.foto = new Blob([reader.result as ArrayBuffer], { type: file.type });
        this.fotoUrl = URL.createObjectURL(file);
      };
      reader.readAsArrayBuffer(file);
      this.router.navigate(['/productos'])
    }
  }
}
