import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public alertcontroller : AlertController, private router: Router, private bd: ServicebdService) {
    addIcons({ add });
  }

  async logoutUsuario() {
    const alert = await this.alertcontroller.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.bd.logoutUsuario(); // Llama al método de logout en el servicio
            this.router.navigate(['/login']); // Redirige a la página de login
          }
        }
      ]
    });
  
    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertcontroller.create({
      header: 'Hasta pronto, Usuario!',
      message: 'Su sesión se ha cerrado exitosamente.',
      buttons: ['Aceptar'],
    });
  
    await alert.present();
  }

}
