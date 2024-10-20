import { Component, OnInit } from '@angular/core';
import { ServicealertService } from 'src/app/services/servicealert.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  usuarios: any = [{
    id_usuario: '',
    nombre: '',
    apellido: '',
    nom_usuario: '',
    correo: '',
    foto_perfil : '',
    id_rol: '',
    total_ventas : ''
  }]

  constructor(private alert: ServicealertService ,private bd : ServicebdService) {
  }

  ngOnInit() {

    this.bd.dbState().subscribe(res=>{
      if(res){
        this.bd.fetchUsuarios().subscribe(data=>{
          this.usuarios = data;
        })
      }
    })

    this.alert.presentAlert('mono qlooo','datos : '+JSON.stringify(this.usuarios))
    this.bd.verUsuarios();

  }

}
