import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})

export class PerfilPage implements OnInit {

  usuario!: User | null;

  foto_perfil!: Blob;
  nom_usuario: string = "";
  pnombre: string = "";
  apellido: string = "";
  correo: string = ""
  ls1!: any;

  idUsuario: string | null = null;

  constructor(public alertcontroller: AlertController, private router: Router, private activedroute: ActivatedRoute, private bd: ServicebdService) {

    this.activedroute.queryParams.subscribe(param => {

      if (this.router.getCurrentNavigation()?.extras.state) {

        this.nom_usuario = this.router.getCurrentNavigation()?.extras?.state?.['user'];

      }
    });
  }

  ngOnInit() {

    const iduser2 = Number(this.idUsuario = localStorage.getItem('id_usuario'));
    this.ls1 = localStorage.getItem('nom_usuario');

    this.bd.fetchUsuario().subscribe((data) => {
      this.usuario = data;
    });

    this.bd.getUserPerfil(iduser2);
    
}

}
