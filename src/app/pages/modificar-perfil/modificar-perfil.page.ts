import { Component, OnInit } from '@angular/core';
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

  idUsuario: string | null = null;
  nom_usuario: string = "";
  form: FormGroup;
  imagen: any;

  constructor(private router: Router, private activerouter: ActivatedRoute, private formBuilder: FormBuilder, private bd: ServicebdService) {

    this.form = this.formBuilder.group({
      nombre: ['', [Validators.pattern('^[A-Za-zÀ-ÿÑñ\\s]*$')]],
      apellido: ['', [Validators.pattern('^[A-Za-zÀ-ÿÑñ\\s]*$')]],
      email: ['', [Validators.email]],
    });

    this.activerouter.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.nom_usuario = this.router.getCurrentNavigation()?.extras?.state?.['user'];
      }
    });
  }

  ngOnInit() {
    const iduser = Number(localStorage.getItem('id_usuario'));

    // Traer los datos del usuario
    this.bd.getUserPerfil(iduser).then(() => {
      this.bd.fetchUsuario().subscribe((data) => {
        this.usuario = data;

        if (this.usuario) {
          this.form.patchValue({
            nombre: this.usuario.pnombre || '',
            apellido: this.usuario.apellido || '',
            email: this.usuario.correo || '',
          });
        }
      });
    }).catch(error => {
      console.error('Error al obtener los datos del perfil:', error);
    });
  }

  // Métodos para "nombre"
  get nombre() {
    return this.form.get('nombre')!;
  }
  
  isNombreInvalid() {
    return this.nombre?.touched && this.nombre?.invalid;
  }
  
  getNombreError() {
    if (this.nombre?.errors?.['pattern']) {
      return 'El campo "Nombre" solo puede contener letras.';
    }
    return '';
  }
  
  // Métodos para "apellido"
  get apellido() {
    return this.form.get('apellido')!;
  }
  
  isApellidoInvalid() {
    return this.apellido?.touched && this.apellido?.invalid;
  }
  
  getApellidoError() {
    if (this.apellido?.errors?.['pattern']) {
      return 'El campo "Apellido" solo puede contener letras.';
    }
    return '';
  }
  
  // Métodos para el correo electrónico
  get email() {
    return this.form.get('email')!;
  }
  
  isEmailInvalid() {
    return this.email.touched && this.email.invalid;
  }
  
  getEmailError() {
    if (this.email.errors?.['email']) {
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

  // Editar
  editar() {
    if (this.form.valid) {
      const { nombre, apellido, email } = this.form.value;
      const iduser = Number(localStorage.getItem('id_usuario'));
  
      // Si se ha subido una imagen, la pasamos al método editarUsuario
      this.bd.editarUsuario(iduser, nombre, apellido, email, this.imagen ? this.imagen : null)
        .then(() => {
          // Navegar de vuelta a la página de perfil después de la edición
          this.router.navigate(['/perfil']);
        });
    }
  }
  
}
