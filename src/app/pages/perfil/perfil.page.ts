import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: string = "";
  contrasena: string = "";

  constructor( public alertcontroller : AlertController) { }

  ngOnInit() {
  }

}
