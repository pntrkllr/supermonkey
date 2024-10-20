import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicealertService } from 'src/app/services/servicealert.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-contrasena',
  templateUrl: './modificar-contrasena.page.html',
  styleUrls: ['./modificar-contrasena.page.scss'],
})
export class ModificarContrasenaPage implements OnInit {

  contrasenaActual: string = "";
  nuevaContrasena: string = "";
  confirmarContrasena: string = "";

  contrasenaActualTocado: boolean = false;
  nuevaContrasenaTocado: boolean = false;
  confirmarContrasenaTocado: boolean = false;
  contrasenaActualIncorrecta: boolean = false; // Variable para controlar el error

  constructor (private bd: ServicebdService, private router: Router, private alert: ServicealertService) {}

  ngOnInit() {}

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

  modificar() {
    // Obtener el id_usuario almacenado en el local storage
    const id_usuario_string = localStorage.getItem('id_usuario');
  
    // Verificar si id_usuario_string es null
    if (!id_usuario_string) {
      this.alert.presentAlert('Error', 'No se ha encontrado el id del usuario.');
      return; // Salir de la función si no se encuentra el id
    }
  
    const id_usuario = Number(id_usuario_string); // Convertir a número
  
    // Verificar si la contraseña actual es correcta
    this.bd.validarContrasena(id_usuario, this.contrasenaActual)
      .then(esValida => {
        if (esValida) {
          // Si la contraseña actual es correcta, continuar con la modificación
          if (this.nuevaContrasena === this.confirmarContrasena) {
            // Lógica para modificar la contraseña
            this.bd.editarContrasena(id_usuario, this.nuevaContrasena)
              .then(() => {
                this.router.navigate(['/perfil']); // Redirigir después de la modificación
              });
          } else {
            // Si las nuevas contraseñas no coinciden, manejar error
            this.alert.presentAlert('Modificar contraseña', 'Las nuevas contraseñas no coinciden.');
          }
        } else {
          // La contraseña actual es incorrecta
          this.contrasenaActualIncorrecta = true;
          this.alert.presentAlert('Modificar contraseña', 'La contraseña actual es errónea.');
        }
      })
      .catch(e => {
        this.alert.presentAlert('Error', 'Error al validar la contraseña: ' + e);
      });
  }
  
}
