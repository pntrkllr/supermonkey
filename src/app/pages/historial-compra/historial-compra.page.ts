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


  constructor(private bd : ServicebdService, private router: Router, private activedroute: ActivatedRoute) { 
    this.activedroute.queryParams.subscribe(param => {

      if (this.router.getCurrentNavigation()?.extras.state) {
        if(this.router.getCurrentNavigation()?.extras?.state?.['id']){
          this.id = this.router.getCurrentNavigation()?.extras?.state?.['id'];
          this.bd.verHistorial(this.id);
        }
      }

    });
  }

  async ngOnInit() {
    this.bd.dbState().subscribe(res=>{
      if(res){
        this.bd.fetchHistorial().subscribe(data=>{
          this.historial = data;
        })
      }
    })
    this.bd.verHistorial(this.id);
  }
}
