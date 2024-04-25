import { Component, computed, effect, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Contract } from '../shared/interfaces/contract';
import { Inspection } from '../shared/interfaces/inspection';
import { AlertService } from '../shared/services/alert.service';
import { ContractsService } from '../shared/services/contracts.service';
import { InspectionsService } from '../shared/services/inspections.service';
@Component({
  selector: 'app-inspection',
  templateUrl: 'inspection.page.html',
  styleUrls: ['inspection.page.scss'],
})
export class InspectionPage {
  //inyeccion de servicios
  private contractsService = inject(ContractsService);
  private inspectionsServices = inject(InspectionsService);
  private alertsService = inject(AlertService);

  //inyeccion de dependencias
  navCtlr = inject(NavController);
  router = inject(Router);

  //declaracion de propiedades
  contracts = this.contractsService.contracts;
  protected currentInspection = this.inspectionsServices.currentInspection;
  _currentContract = this.contractsService.currentContract;
  currentContract: Contract = {} as Contract;
  carForm: FormControl;
  cars = computed(() => {
    return this.contracts()?.map((a) => a.car);
  });
  currentStage: string;

  constructor() {
    this.currentStage =
      this.router.getCurrentNavigation()?.extras?.state?.['stage'];

    this.carForm = new FormControl(this.currentContract.idVehiculo || null);
    effect(() => {
      this.currentContract = this.contractsService.currentContract();
    });
  }

  ngOnDestroy(){
    this._currentContract.set({} as Contract)
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
        current.nomRecibeVehiculo = currentContract.customer.nomCliente;
        current.daniosSalida = [];
        current.accesoriosSalida   = [];
      }

      return current as Inspection;
    });
  }

  goToNext() {
    const carSet = this.currentInspection()?.idVehiculo != undefined;
    const fuelSet = this.currentInspection()?.combSalida != null;
    const odoSet = this.currentInspection()?.odoSalida != null;

    if (carSet && fuelSet && odoSet) {
      this.navCtlr.navigateForward(['tabs/inspection/damages']);
    } else {
      const message = !carSet
        ? 'No ha seleccionado un vehículo'
        : 'No ha completado la información';

      this.alertsService.basicAlert('Atención!', message, ['Ok']);
    }
  }

  setOdometer(e: any) {
    this.inspectionsServices.currentInspection.update((values) => {
      const current = { ...values };
      {
        current.odoSalida = parseInt(e.target.value);
      }

      return current as Inspection;
    });
  }

  setFuel(e: any) {
    this.inspectionsServices.currentInspection.update((values) => {
      const current = { ...values };
      {
        current.combSalida = e.target.value.toString().trim();
      }

      return current as Inspection;
    });
  }
}
