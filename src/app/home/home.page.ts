import { Component } from '@angular/core';
import { ServicebdService } from '../services/servicebd.service';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  //vibración para botones del carrito
  async triggerHeavyHaptic() {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  }

}
