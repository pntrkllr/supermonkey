import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServicealertService } from 'src/app/services/servicealert.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  constructor(public alertcontroller : AlertController, private alert: ServicealertService,private bd : ServicebdService) { }

  ngOnInit() {



  }

  mensaje() {
    this.alert.presentAlert('mono klooo', 'Usted es un mono kuliao feo')
  }

}
