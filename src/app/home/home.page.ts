import { Component, computed, effect, inject } from '@angular/core';
import { InspectionsService } from '../shared/services/inspections.service';
import { NavController } from '@ionic/angular';
import { AuthService } from '../shared/services/auth.service';
import { Inspection } from '../shared/interfaces/inspection';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //inyeccion de servicios
  private inspectionsServices = inject(InspectionsService);
  private authService = inject(AuthService);

  //inyeccion de dependencias
  private navCtr = inject(NavController);

  //declara la variable signal que filtra las inspecciones en estado abierto
  protected openInspections = computed(() => {
    return this.inspectionsServices
      .inspections()
      ?.filter((x) => x.state.descEstado == 'Abierta');
  });

  protected closedInspections = computed(() => {
    return this.inspectionsServices
      .inspections()
      ?.filter((x) => x.state.descEstado == 'Cerrada');
  });

  //declaracion de propiedades
  currentUser = this.authService.getCurrentUser();
  constructor() {}

  ngOnInit() {
    this.inspectionsServices.clearState();
  }

  goToCheckOut() {
    this.inspectionsServices.currentInspection.update((value) => {
      const current = { ...value };
      {
        current.stage = 'checkout';
      }
      return current as Inspection;
    });
    this.navCtr.navigateForward(['tabs/inspection'], {
      state: { stage: 'checkout' },
    });
  }
  goToCheckIn() {
    this.inspectionsServices.currentInspection.update((value) => {
      const current = { ...value };
      {
        current.stage = 'checkin';
      }
      return current as Inspection;
    });
    this.navCtr.navigateForward(['tabs/inspection'], {
      state: { stage: 'checkin' },
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
