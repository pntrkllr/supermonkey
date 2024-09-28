import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  form: FormGroup;

  constructor(public alertcontroller: AlertController, private router: Router, private toastController: ToastController, private formBuilder: FormBuilder) { 

    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      usuario: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/)
      ]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordsMatch });
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

  //métodos para "usuario"
  get usuario() {
    return this.form.get('usuario')!;
  }

  isUsuarioInvalid() {
    return this.usuario.touched && this.usuario.invalid;
  }

  getUsuarioError() {
    if (this.usuario.errors?.['required']) {
      return 'El campo "Nombre de usuario" está vacío.';
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

  //métodos para la contraseña y confirmar contraseña
  get password() {
    return this.form.get('password')!;
  }

  get confirmPassword() {
    return this.form.get('confirmPassword')!;
  }

  markPasswordAsTouched() {
    this.password.markAsTouched();
    this.confirmPassword.markAsTouched();
  }

  //para validar que las 2 contraseñas sean iguales
  passwordsMatch(control: FormGroup) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsNotMatch: true };
  }

  isPasswordInvalid() {
    return this.password.touched && this.password.invalid;
  }

  getPasswordError() {
    if (this.password.errors?.['required']) {
      return 'La contraseña es obligatoria.';
    } else if (this.password.errors?.['pattern']) {
      return 'La contraseña debe tener entre 8 y 16 caracteres, incluir al menos un número y un símbolo.';
    }
    return '';
  }

  arePasswordsDifferent() {
    return this.confirmPassword.touched && this.form.errors?.['passwordsNotMatch'];
  }


  getConfirmPasswordError() {
    if (this.confirmPassword.errors?.['required']) {
      return 'La confirmación de la contraseña es obligatoria.';
    } else if (this.arePasswordsDifferent()) {
      return 'Las contraseñas no coinciden.';
    }
    return '';
  }

  async presentAlert() {
    const alert = await this.alertcontroller.create({
      header: 'Se ha registrado correctamente',
      message: 'Iniciar sesión para entrar',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async presentToast(position: 'middle', texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}
