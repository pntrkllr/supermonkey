import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modificar-contrasena',
  templateUrl: './modificar-contrasena.page.html',
  styleUrls: ['./modificar-contrasena.page.scss'],
})
export class ModificarContrasenaPage implements OnInit {

  contrasena: string = "";
  contrasena2: string = "";
  contrasena3: string = "";

  constructor(public alertcontroller: AlertController, private router: Router, private toastController: ToastController, private formBuilder: FormBuilder) { }

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

  async presentToast(position: 'middle', texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  validarContrasena() {

    const formatoPassword = /^(?=.[A-Z])(?=.\d)(?=.[!@#$%^&(),.?":{}|<>]).*$/;

    if (this.contrasena === "") {

      this.presentToast('middle', 'El campo "Contraseña actual" está vacío.');
      return;

    } if (this.contrasena2 === "") {

      this.presentToast('middle', 'El campo "Nueva contraseña" está vacío.');
      return;

    } if (this.contrasena3 === "") {

      this.presentToast('middle', 'El campo "Confirmar contraseña" está vacío.');
      return;

    } if (this.contrasena2 !== this.contrasena3) {

      this.presentToast('middle', 'Las contraseñas no coinciden.');
      return;

    } if (this.contrasena.length < 8 || this.contrasena.length > 16) {

      this.presentToast('middle', 'La contraseña es menor a 8 o mayor a 16 caracteres.');
      return;

    } if (!formatoPassword.test(this.contrasena2)) {

      this.presentToast('middle', 'La contraseña debe contener como mínimo una mayúscula, un número y un simbolo.')
      return;
      
    } else {
      this.presentAlert;
      this.router.navigate(['/login']);
    }
  }

}
