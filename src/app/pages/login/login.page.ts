import { Component, OnInit } from '@angular/core';

import { addIcons } from 'ionicons';
import { eye, lockClosed } from 'ionicons/icons';
import { AlertController, ToastController } from '@ionic/angular';
import {NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuarioAdmin: string="admin";
  contrasenaAdmin: string="admin123";
  
  usuarioCli: string ="usuario";
  contrasenaCli: string ="123456789";

  usuario:string ="";
  contrasena:string="";


  constructor( public alertcontroller : AlertController, private router: Router, private toastController: ToastController) { 
    addIcons({ eye, lockClosed });
    
  }

  ngOnInit() {
  }
  async presentAlert( titulo:string,texto:string) {
    const alert = await this.alertcontroller.create({
      header: titulo,
      message: texto,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  validarUsuario(){
    if (this.usuario===this.usuarioAdmin && this.contrasena===this.contrasenaAdmin){
      let navigationextras: NavigationExtras = {
        state:{
          con: this.contrasenaAdmin,
          user: this.usuarioAdmin
        }
      }
      this.presentAlert('Bienvenido','Ha iniciado sesión como admin. Disfrute de Supermonkey!');
      this.router.navigate(['/productos'],navigationextras)
    }if(this.usuario===this.usuarioCli && this.contrasena===this.contrasenaCli){
      let navigationextras: NavigationExtras = {
        state:{
          con: this.contrasenaCli,
          user: this.usuarioCli
        }
      }
      this.presentAlert('Bienvenido usuario!','Ha iniciado sesión correctamente. Disfrute de Supermonkey!');
      this.router.navigate(['/productos'], navigationextras)
    }if (this.usuario==="" || this.contrasena===""){

      this.presentAlert('Los campos están vacíos','Por favor, ingrese su nombre de usuario o regístrese');
      return;
    }if (this.contrasena!==this.contrasenaAdmin && this.usuario!==this.usuarioAdmin && this.contrasena!==this.contrasenaCli && this.usuario!==this.usuarioCli){
      
      this.presentAlert('El usuario no existe','Por favor, ingrese su nombre de usuario o regístrese');
      return;
    }
  }

  async presentToast(position: 'bottom', texto:string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  async restablecerContrasena() {
    const alert = await this.alertcontroller.create({
      header: 'Restablecer contraseña',
      message: 'Escribe tu correo electrónico:',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo electrónico'
        },
      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Aceptar',
        handler: ()=> {
          this.presentToast('bottom', 'Se ha enviado un correo de recuperación.');
        }
      }
    ],
    });

    await alert.present();
  }
}