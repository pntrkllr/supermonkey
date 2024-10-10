import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  foto_perfil!: Blob;
  nom_usuario: string = "";
  pnombre: string = "";
  apellido: string = "";
  correo: string = ""

  idUsuario: string | null = null;

  constructor(public alertcontroller : AlertController, private router: Router, private activedroute: ActivatedRoute, private bd: ServicebdService) { 
    this.activedroute.queryParams.subscribe(param =>{

      if(this.router.getCurrentNavigation()?.extras.state){

        this.nom_usuario = this.router.getCurrentNavigation()?.extras?.state?.['user'];
        
      }
    });
   }

   ngOnInit() {
    this.idUsuario = localStorage.getItem('id_usuario');
  }

}
