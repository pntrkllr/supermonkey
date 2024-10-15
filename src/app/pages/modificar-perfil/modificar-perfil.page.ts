import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})

export class ModificarPerfilPage implements OnInit {

  usuario!: User | null;

  idUsuario2!: number;
  form: FormGroup;
  foto_perfil!: Blob;
  nom_usuario: string = "";
  idUsuario: string | null = null;
  imagen: any;
  ls1!: any;

  constructor(private router: Router, private activerouter: ActivatedRoute, public alertcontroller: AlertController, private formBuilder: FormBuilder, private bd: ServicebdService) {

    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.activerouter.queryParams.subscribe(param => {

      if (this.router.getCurrentNavigation()?.extras.state) {

        this.nom_usuario = this.router.getCurrentNavigation()?.extras?.state?.['user'];

      }
    });
  }

  ngOnInit() {
    this.bd.fetchUsuario().subscribe((data) => {
      this.usuario = data;
    })
    this.bd.getUserPerfil(this.ls1);
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

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    this.imagen = image.webPath;
  };

  //editar
  editar() {
    if (this.form.valid) {
      const { nombre, apellido, email } = this.form.value;
      const iduser = Number(localStorage.getItem('id_usuario'));
      this.bd.editarUsuario(iduser, nombre, apellido, email);
      this.router.navigate(['/perfil']);
    }
  }
}
