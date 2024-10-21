import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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

  constructor(private alert: ServicealertService, private bd : ServicebdService, private router: Router) {
  }

  ngOnInit() {

    this.bd.dbState().subscribe(res=>{
      if(res){
        this.bd.fetchUsuarios().subscribe(data=>{
          this.usuarios = data;
        })
      }
    })
    this.bd.verUsuarios();

  }

  histoUsuario(id_usuario: number){
    let navigationExtras: NavigationExtras = {
      state: {
        id : id_usuario
      }
    }
    this.router.navigate(['/historial-compra'], navigationExtras);
  }

}
