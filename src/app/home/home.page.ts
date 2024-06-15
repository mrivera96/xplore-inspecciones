import { Component, computed, effect, inject } from '@angular/core';
import { InspectionsService } from '../shared/services/inspections.service';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../shared/services/auth.service';
import { Inspection } from '../shared/interfaces/inspection';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleArrowRight,
  faCircleArrowLeft,
  faCarSide,
  faFolderOpen,
  faFolderClosed,
} from '@fortawesome/free-solid-svg-icons';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FontAwesomeModule, ToolbarComponent],
})
export class HomePage {
  //inyeccion de servicios
  private inspectionsServices = inject(InspectionsService);
  private authService = inject(AuthService);

  //inyeccion de dependencias
  private router = inject(Router);

  //declara la variable signal que filtra las inspecciones en estado abierto
  protected openInspections = computed(() => {
    return this.inspectionsServices
      .inspections()
      ?.filter((x) => x.state?.descEstado == 'Abierta')
      .sort((a, b) => b.idInspeccion! - a.idInspeccion!)
      .slice(0, 3);
  });

  protected closedInspections = computed(() => {
    return this.inspectionsServices
      .inspections()
      ?.filter((x) => x.state?.descEstado == 'Cerrada')
      .sort((a, b) => b.idInspeccion! - a.idInspeccion!)
      .slice(0, 3);
  });

  //declaracion de propiedades
  circleArrowRigth = faCircleArrowRight;
  circleArrowLeft = faCircleArrowLeft;
  carSide = faCarSide;
  folderOpen = faFolderOpen;
  folderClosed = faFolderClosed;
  currentUser = this.authService.currentUser;
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
    this.router.navigate(['inspections/create'], {
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
    this.router.navigate(['inspections/create'], {
      state: { stage: 'checkin' },
    });
  }

  gotToReview(inspection: Inspection) {
    this.inspectionsServices.currentInspection.set(inspection);
    this.router.navigate(['/inspection-detail']);
  }

  goToCheckouts() {
    this.router.navigate(['inspections/checkout'], {
      state: { stage: 'checkout' },
    });
  }

  goToCheckins() {
    this.router.navigate(['inspections/checkin'], {
      state: { stage: 'checkin' },
    });
  }

  onLogout() {
    this.authService.logout();
  }

  handleRefresh(event: any) {
    this.inspectionsServices.loadData();
    event.target.complete();
  }
}
