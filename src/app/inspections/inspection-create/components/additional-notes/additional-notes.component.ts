import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { ToolbarComponent } from 'src/app/shared/components/toolbar/toolbar.component';
import { Customer } from 'src/app/shared/interfaces/customer';
import { Inspection } from 'src/app/shared/interfaces/inspection';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InspectionsService } from 'src/app/shared/services/inspections.service';

@Component({
  selector: 'app-additional-notes',
  templateUrl: './additional-notes.component.html',
  styleUrls: ['./additional-notes.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ToolbarComponent],
})
export class AdditionalNotesComponent implements OnInit {
  //inyeccion de servicios
  inspectionsService = inject(InspectionsService);
  private alertsService = inject(AlertService);

  //inyeccion de dependencias
  private navCtrl = inject(NavController);
  router = inject(Router);

  //declaracion de propiedades
  notas: {
    comentariosLlantasDelanteras?: string;
    comentariosLlantasTraseras?: string;
    comentariosLlantaRepuesto?: string;
    comentariosBateria?: string;
    otrasObservacionesSalida?: string;
    otrasObservacionesEntrega?: string;
  } = {};
  customer: Customer;
  driver: Customer;

  currentInspection = this.inspectionsService.currentInspection;

  title: string;
  constructor() {
    this.title =
      this.inspectionsService.currentInspection()?.stage == 'checkin'
        ? ' Checkin'
        : ' Checkout';

    if (this.currentInspection()?.stage == 'checkin') {
      this.notas = {
        comentariosBateria: this.currentInspection()?.comentariosBateria,
        comentariosLlantasDelanteras:
          this.currentInspection()?.comentariosLlantasDelanteras,
        comentariosLlantasTraseras:
          this.currentInspection()?.comentariosLlantasTraseras,
        comentariosLlantaRepuesto:
          this.currentInspection()?.comentariosLlantaRepuesto,
        otrasObservacionesSalida:
          this.currentInspection()?.otrasObservacionesSalida,
        otrasObservacionesEntrega:
          this.currentInspection()?.otrasObservacionesEntrega,
      };
    }

    this.customer =
      this.router.getCurrentNavigation()?.extras?.state?.['customer'];
    this.driver = this.router.getCurrentNavigation()?.extras?.state?.['driver'];
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.notas = {};
  }

  async goToNext() {
    if (this.currentInspection()?.stage == 'checkout') {
      this.saveCheckout();
    } else {
      this.saveCheckin();
    }
    this.navCtrl.navigateForward(['/inspections/create/signing'], {
      state: {
        customer: this.customer,
        driver: this.driver,
      },
    })
  }

  saveCheckout() {
    this.currentInspection.update((values) => {
      const current = { ...values };
      {
        current.comentariosLlantasDelanteras =
          this.notas.comentariosLlantasDelanteras;
        current.comentariosLlantasTraseras =
          this.notas.comentariosLlantasTraseras;
        current.comentariosLlantaRepuesto =
          this.notas.comentariosLlantaRepuesto;
        current.comentariosBateria = this.notas.comentariosBateria;
        current.otrasObservacionesSalida = this.notas.otrasObservacionesSalida;
        current.otrasObservacionesEntrega =
          this.notas.otrasObservacionesEntrega;
      }

      return current as Inspection;
    });

  }

  saveCheckin() {
    this.currentInspection.update((values) => {
      const current = { ...values };
      {
        current.comentariosLlantasDelanteras =
          this.notas.comentariosLlantasDelanteras;
        current.comentariosLlantasTraseras =
          this.notas.comentariosLlantasTraseras;
        current.comentariosLlantaRepuesto =
          this.notas.comentariosLlantaRepuesto;
        current.comentariosBateria = this.notas.comentariosBateria;
        current.otrasObservacionesSalida = this.notas.otrasObservacionesSalida;
        current.otrasObservacionesEntrega =
          this.notas.otrasObservacionesEntrega;
      }

      return current as Inspection;
    });

    this.inspectionsService.closeInspection();
  }

  goToPrev() {
    this.navCtrl.back();
  }
}
