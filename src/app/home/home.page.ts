import { Component } from '@angular/core';
import { ServicebdService } from '../services/servicebd.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private bd: ServicebdService) {}

}
