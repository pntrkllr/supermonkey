import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { eye, lockClosed } from 'ionicons/icons';
import { AlertController, NavController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nom_usuario: string = "";
  contrasena: string = "";
  rolUsuario: string | null = null;

  constructor(
    public alertcontroller: AlertController,
    private navcontroller: NavController,
    private bd: ServicebdService
  ) {
    addIcons({ eye, lockClosed });
  }

  ngOnInit() {
    // Verificar si hay un usuario logueado al iniciar la aplicación
    const username = localStorage.getItem('nom_usuario');
    this.rolUsuario = localStorage.getItem('id_rol'); // Aquí se obtiene el rol del usuario desde localStorage

    if (username) {
      // Redirigir a la página de productos si hay un usuario logueado
      this.navcontroller.navigateForward('/productos');
    }
  }

  loginUsuario() {
    this.bd.getUsuario(this.nom_usuario, this.contrasena)
      .then((usuario) => {
        if (usuario) {
          // Guardar el rol del usuario en localStorage
          localStorage.setItem('id_rol', usuario.id_rol);
          localStorage.setItem('nom_usuario', usuario.nom_usuario);
  
          // Redirigir a la página home si el login es exitoso
          this.navcontroller.navigateForward('/productos');
          alert('Bienvenido a Supermonkey!');
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      })
      .catch(e => console.error('Error en el login', e));
  }
  
}
