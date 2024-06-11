import { Component, computed, effect, inject } from '@angular/core';
import { InspectionsService } from '../shared/services/inspections.service';
import { NavController } from '@ionic/angular';
import { AuthService } from '../shared/services/auth.service';
import { Inspection } from '../shared/interfaces/inspection';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-inspections',
  templateUrl: 'inspections.page.html',
  styleUrls: ['inspections.page.scss'],
})
export class InspectionsPage {
  //inyeccion de servicios
  private inspectionsServices = inject(InspectionsService);
  private authService = inject(AuthService);

  //inyeccion de dependencias
  private router = inject(Router);
  private navController = inject(NavController);

  //declara la variable signal que filtra las inspecciones en estado abierto
  protected openInspections = computed(() => {
    return this.inspectionsServices
      .inspections()
      ?.filter((x) => x.state?.descEstado == 'Abierta');
  });

  protected closedInspections = computed(() => {
    return this.inspectionsServices
      .inspections()
      ?.filter((x) => x.state?.descEstado == 'Cerrada');
  });

  //declaracion de propiedades
  currentUser = this.authService.currentUser;
  currentStage = null;
  constructor() {
    this.currentStage =
      this.router.getCurrentNavigation()?.extras?.state?.['stage'];
  }

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
    this.router.navigate(['inspection'], {
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
    this.router.navigate(['inspection'], {
      state: { stage: 'checkin' },
    });
  }

  gotToDetail(inspection: Inspection) {
    this.inspectionsServices.currentInspection.set(inspection);
    let navigationExtras: NavigationExtras = {
      state: {
        idInspeccion: inspection.idInspeccion,
      },
    };
    this.navController.navigateForward('/inspections/detail', navigationExtras);
  }

  onLogout() {
    this.authService.logout();
  }
}
