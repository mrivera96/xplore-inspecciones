import { Component, OnInit, inject } from '@angular/core';
import { DamageTypesService } from '../shared/services/damage-types.service';
import { DamageType } from '../shared/interfaces/damage-type';
import { ItemReorderEventDetail, NavController } from '@ionic/angular';

@Component({
  selector: 'app-damage-types',
  templateUrl: './damage-types.page.html',
  styleUrls: ['./damage-types.page.scss'],
})
export class DamageTypesPage implements OnInit {
  //inyeccion de servicios
  private damageTypesService = inject(DamageTypesService);

  //inyeccion de dependencias
  private navCtrl = inject(NavController);

  //declaracion de propiedades
  protected damageTypes = this.damageTypesService.damageTypes;

  constructor() {}

  ngOnInit() {}

  goToDetail(damageType: DamageType) {
    this.navCtrl.navigateForward([
      `damage-types/detail/${damageType.idTipoDanio}`,
    ]);
  }

  goToCreate() {
    this.navCtrl.navigateForward([`damage-types/create`]);
  }

  handleRefresh(event: any) {
    this.damageTypesService.loadData();
    event.target.complete();
  }

}
