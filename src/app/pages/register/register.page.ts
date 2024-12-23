import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ServicealertService } from 'src/app/services/servicealert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form!: FormGroup;
  imagen: any = null;
  id_rol: number = 2;

  // pregunta!: string;

  constructor(private bd: ServicebdService, private router: Router, private fb: FormBuilder, private alert: ServicealertService) { }

  ngOnInit() {

    this.form = this.fb.group({
      pnombre: ['', [Validators.required, Validators.pattern('^[A-Za-zÀ-ÿÑñ\\s]*$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[A-Za-zÀ-ÿÑñ\\s]*$')]],
      nom_usuario: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        this.passwordValidator
      ]],
      confirmar_contrasena: ['', [Validators.required]],
      pregunta: ['', [Validators.required]],
      respuesta: ['', [Validators.required]]
    });
  }

  passwordValidator(control: any) {
    const password = control.value;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const valid = hasLetter && hasNumber && hasSymbol;
    return valid ? null : { invalidPassword: true };
  }

  crear() {
    if (this.form.valid) {
      const { pnombre, apellido, nom_usuario, correo, contrasena, pregunta, respuesta } = this.form.value;
      const foto = this.imagen || null;
      this.bd.insertarUsuario(foto, pnombre, apellido, nom_usuario, correo, contrasena, pregunta, respuesta, this.id_rol);
      this.router.navigate(['/login']);
    }
  }

  isNombreInvalid() {
    const control = this.form.get('pnombre');
    return control?.touched && control.invalid;
  }

  getNombreError() {
    const control = this.form.get('pnombre');
    if (control?.hasError('required')) {
      return 'El nombre no puede estar vacío.';
    } else if (control?.hasError('pattern')) {
      return 'El nombre solo debe contener letras.';
    }
    return '';
  }

  isApellidoInvalid() {
    const control = this.form.get('apellido');
    return control?.touched && control.invalid;
  }

  getApellidoError() {
    const control = this.form.get('apellido');
    if (control?.hasError('required')) {
      return 'El apellido no puede estar vacío.';
    } else if (control?.hasError('pattern')) {
      return 'El apellido solo debe contener letras.';
    }
    return '';
  }

  isUsuarioInvalid() {
    const control = this.form.get('nom_usuario');
    return control?.touched && control.invalid;
  }

  getUsuarioError() {
    const control = this.form.get('nom_usuario');
    if (control?.hasError('required')) {
      return 'El nombre de usuario no puede estar vacío.';
    }
    return '';
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

  isPasswordInvalid() {
    const control = this.form.get('contrasena');
    return control?.touched && control.invalid;
  }

  getPasswordError() {
    const control = this.form.get('contrasena');
    if (control?.hasError('required')) {
      return 'La contraseña no puede estar vacía.';
    } else if (control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    } else if (control?.hasError('maxlength')) {
      return 'La contraseña no puede tener más de 16 caracteres.';
    } else if (control?.hasError('invalidPassword')) {
      return 'La contraseña debe contener letras, números y símbolos.';
    }
    return '';
  }

  isRespuestaInvalid() {
    const control = this.form.get('respuesta');
    return control?.touched && control.invalid;
  }

  getRespuestaError() {
    const control = this.form.get('respuesta');
    if (control?.hasError('required')) {
      return 'La respuesta no puede estar vacía.';
    }
    return '';
  }

  arePasswordsDifferent() {
    const password = this.form.get('contrasena')?.value;
    const confirmPassword = this.form.get('confirmar_contrasena')?.value;
    return password && confirmPassword && password !== confirmPassword;
  }

  getConfirmPasswordError() {
    return 'Las contraseñas no coinciden.';
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    this.imagen = image.webPath;
  };
}
