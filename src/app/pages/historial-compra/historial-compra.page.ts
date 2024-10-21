import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicealertService } from 'src/app/services/servicealert.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-historial-compra',
  templateUrl: './historial-compra.page.html',
  styleUrls: ['./historial-compra.page.scss'],
})
export class HistorialCompraPage implements OnInit {


  historial : any = [{
    id_venta: '',
    total: '',
    id_estado: '',
    id_usuario: '',
    id_producto: '',
    cantidad: '',
    sub_total: '',
    producto_nombre: '',
    foto : ''
  }];
  id! : number;


  constructor(private alert : ServicealertService,private bd : ServicebdService, private router: Router, private activedroute: ActivatedRoute) { 
    this.activedroute.queryParams.subscribe(param => {

      if (this.router.getCurrentNavigation()?.extras.state) {
  
        this.id = this.router.getCurrentNavigation()?.extras?.state?.['id'];
  
      }
    });
  }

  ngOnInit() {
    this.bd.dbState().subscribe(res=>{
      if(res){
        this.bd.fetchHistorial().subscribe(data=>{
          this.historial= data;
        })
      }
    })
    this.alert.presentAlert('mono qlooo', 'datos : ' +this.id);
    if(this.id){
      this.bd.verHistorial(this.id);
    }else{
      const id_usuario = Number(localStorage.getItem('id_usuario'))
      this.bd.verHistorial(id_usuario);
    }
  }
}
