import { Component, effect, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Contract } from '../shared/interfaces/contract';
import { Inspection } from '../shared/interfaces/inspection';
import { AlertService } from '../shared/services/alert.service';
import { ContractsService } from '../shared/services/contracts.service';
import { InspectionsService } from '../shared/services/inspections.service';
@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.page.html',
  styleUrls: ['checkout.page.scss'],
})
export class CheckoutPage {
  //inyeccion de servicios
  private contractsService = inject(ContractsService);
  private inspectionsServices = inject(InspectionsService);
  private alertsService = inject(AlertService);

  //inyeccion de dependencias
  navCtlr = inject(NavController);

  //declaracion de propiedades
  contracts = this.contractsService.contracts;
  step: number = 1;
  protected currentInspection = this.inspectionsServices.currentInspection;
  _currentContract = this.contractsService.currentContract;
  currentContract: Contract = {} as Contract;
  carForm: FormControl;

  constructor() {
    this.carForm = new FormControl(this.currentContract.idVehiculo || null);
    effect(() => {
      this.currentContract = this.contractsService.currentContract();
    });
  }

  //Establece el vehiculo en el estado global de la inspección actual
  selectContract(e: any) {
    //this.currentInspeccion.update((inspection)=>)
    const currentContract = this.contractsService
      .contracts()
      ?.find((x) => x.idVehiculo == e.value.idVehiculo) as Contract;

    this.contractsService.setCurrentContract(currentContract);
    this.inspectionsServices.currentInspection.update((values) => {
      const current = { ...values };
      {
        current.idVehiculo = currentContract.idVehiculo;
        current.idContrato = currentContract.idContrato;
        current.idCliente = currentContract.idCliente;
        current.idAgenciaSalida = currentContract.idAgenciaSalida;
        current.fechaSalida = currentContract.fechaSalida;
        current.odoSalida = currentContract.car?.odometro;
      }

      return current as Inspection;
    });
  }

  goToNext() {
    const carSet = this.currentInspection()?.idVehiculo != undefined;
    const fuelSet = this.currentInspection()?.combSalida != null;
    const odoSet = this.currentInspection()?.odoSalida != null;

    if (carSet && fuelSet && odoSet) {
      this.inspectionsServices.currentInspection.update((values) => {
        const current = { ...values };
        {
          current.odoSalida = this.currentContract?.car?.odometro;
          current.combSalida = this.currentContract?.car?.fuel;
        }

        return current as Inspection;
      });
      console.log(this.currentInspection);
      this.navCtlr.navigateForward(['checkout/damages']);
    } else {
      const message = !carSet
        ? 'No ha seleccionado un vehículo'
        : 'No ha completado la información';

      this.alertsService.basicAlert('Atención!', message, ['Ok']);
    }
  }

  goToPrev() {
    this.step -= 1;
  }
}
