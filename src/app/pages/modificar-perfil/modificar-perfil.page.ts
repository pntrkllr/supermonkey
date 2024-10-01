import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})

export class ModificarPerfilPage implements OnInit {

  form: FormGroup;

  constructor(public alertcontroller: AlertController, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      usuario: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
  }

  //métodos para "nombre"
  get nombre() {
    return this.form.get('nombre')!;
  }

  isNombreInvalid() {
    return this.nombre?.touched && this.nombre?.invalid;
  }

  getNombreError() {
    if (this.nombre?.errors?.['required']) {
      return 'El campo "Nombre" está vacío.'
    } else if (this.nombre?.errors?.['pattern']) {
      return 'El campo "Nombre" solo puede contener letras.'
    }
    return '';
  }

  //métodos para "apellido"
  get apellido() {
    return this.form.get('apellido')!;
  }

  isApellidoInvalid() {
    return this.apellido?.touched && this.apellido?.invalid;
  }

  getApellidoError() {
    if (this.apellido?.errors?.['required']) {
      return 'El campo "Apellido" está vacío.'
    } else if (this.apellido?.errors?.['pattern']) {
      return 'El campo "Apellido" solo puede contener letras.'
    }
    return '';
  }

  //métodos para el correo electrónico
  get email() {
    return this.form.get('email')!;
  }

  isEmailInvalid() {
    return this.email.touched && this.email.invalid;
  }

  getEmailError() {
    if (this.email.errors?.['required']) {
      return 'El campo "Correo electrónico" está vacío.';
    } else if (this.email.errors?.['email']) {
      return 'Ingresa un correo electrónico válido.';
    }
    return '';
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Archivo seleccionado:', file);
    }
  }

}
