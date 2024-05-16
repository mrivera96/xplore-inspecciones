import { Component, OnInit, inject } from '@angular/core';
import { AutoPartsService } from '../shared/services/auto-parts.service';
import { AutoPart } from '../shared/interfaces/auto-part';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-auto-parts',
  templateUrl: './auto-parts.page.html',
  styleUrls: ['./auto-parts.page.scss'],
})
export class AutoPartsPage implements OnInit {
  //inyeccion de servicios
  private autoPartsService = inject(AutoPartsService);

  //inyeccion de dependencias
  private navCtrl = inject(NavController);

  //declaracion de propiedades
  protected autoParts = this.autoPartsService.autoParts;

  constructor() {}

  ngOnInit() {}

  goToDetail(autoPart: AutoPart) {
    this.navCtrl.navigateForward([`auto-parts/detail/${autoPart.idPieza}`]);
  }

  goToCreate() {
    this.navCtrl.navigateForward([`auto-parts/create`]);
  }
}
