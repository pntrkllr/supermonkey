import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicealertService } from 'src/app/services/servicealert.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {

  nuevaContrasena: string = "";
  confirmarContrasena: string = "";

  nuevaContrasenaTocado: boolean = false;
  confirmarContrasenaTocado: boolean = false;

  constructor(private router: Router, private bd: ServicebdService, private activerouter: ActivatedRoute, private alert: ServicealertService) { }

  ngOnInit() {
  }

  patternContrasena() {
    const simbolos = /[!@#$%^&*(),.?":{}|<>]/.test(this.nuevaContrasena);
    return simbolos;
  }

  numerosContrasena() {
    const numeros = /\d/.test(this.nuevaContrasena);
    return numeros;
  }

  letrasContrasena() {
    const letras = /[a-zA-Z]/.test(this.nuevaContrasena)
    return letras;
  }


  cambiarContrasena() {
    const correo = localStorage.getItem('correo-validado');
  
    if (!correo) {
      this.alert.presentAlert('Error', 'No se encontró el correo para cambiar la contraseña.');
      return;
    }
  
    if (this.nuevaContrasena === this.confirmarContrasena) {
      this.bd.restablecerContrasena(correo, this.nuevaContrasena)
        .then(() => {
          this.router.navigate(['/login']);
        })
        .catch(error => {
          this.alert.presentAlert('Error', 'Error al modificar la contraseña: ' + JSON.stringify(error));
        });
    } else {
      this.alert.presentAlert('Modificar contraseña', 'Las nuevas contraseñas no coinciden.');
    }
  }
  
}
