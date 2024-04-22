import { Component, computed, inject } from '@angular/core';
import { InspectionsService } from '../services/inspections.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //inyeccion de servicios
  private inspectionsServices = inject(InspectionsService);

  //inyeccion de dependencias
  private navCtr = inject(NavController);

  //declara la variable signal que filtra las inspecciones en estado abierto
  protected openInspections = computed(() => {
    return this.inspectionsServices
      .inspections()
      ?.filter((x) => x.state.descEstado == 'Abierta');
  });
  constructor() {}

  goToCheckOut() {
    this.navCtr.navigateForward(['tabs/checkout']);
  }
}
