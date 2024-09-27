import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  usuario: string = "";
  email: string = "";
  contrasena: string = "";
  contrasena2: string = "";

  constructor(public alertcontroller: AlertController, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertcontroller.create({
      header: 'Se ha registrado correctamente',
      message: 'Iniciar sesión para entrar',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  validarUsuario() {

    const formatoPassword = /^(?=.[A-Z])(?=.\d)(?=.[!@#$%^&(),.?":{}|<>]).*$/;

    if (this.usuario === "") {

      this.presentToast('middle', 'El campo "Nombre de usuario" está vacío.');
      return;
    } if (this.email === "") {

      this.presentToast('middle', 'El campo "Correo electrónico" está vacío.');
      return;
    } if (this.contrasena === "") {

      this.presentToast('middle', 'El campo "Contraseña" está vacío.');
      return;
    } if (this.contrasena2 === "") {

      this.presentToast('middle', 'El campo "Confirmar contraseña" está vacío.');
      return;
    } if (this.contrasena !== this.contrasena2) {

      this.presentToast('middle', 'Las contraseñas no coinciden.');
      return;
    } if (this.contrasena.length < 8 || this.contrasena.length > 16) {

      this.presentToast('middle', 'La contraseña es menor a 8 o mayor a 16 caracteres.');
      return;

    } if (!formatoPassword.test(this.contrasena)) {

      this.presentToast('middle', 'La contraseña debe contener como mínimo una mayuscula, un número y un simbolo.')
      return;
      
    } else {
      this.presentAlert;
      this.router.navigate(['/login']);
    }
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
