import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private bd: ServicebdService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  isEmailInvalid() {
    const control = this.form.get('correo');
    return control?.touched && control.invalid;
  }

  getEmailError() {
    const control = this.form.get('correo');
    if (control?.hasError('required')) {
      return 'El correo no puede estar vacío.';
    } else if (control?.hasError('email')) {
      return 'Correo inválido';
    }
    return '';
  }

  getCorreo() {
    if (this.form.valid) {
      const { correo } = this.form.value;
  
      this.bd.validarCorreo(correo);
    }
  }
  
  

}
