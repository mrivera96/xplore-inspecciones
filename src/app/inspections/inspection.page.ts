import { Component, OnDestroy, effect, inject } from '@angular/core';
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
export class InspectionPage implements OnDestroy {
  //inyeccion de servicios
  private contractsService = inject(ContractsService);
  private inspectionsServices = inject(InspectionsService);
  private alertsService = inject(AlertService);

  //inyeccion de dependencias
  navCtlr = inject(NavController);
  router = inject(Router);

  //declaracion de propiedades
  title = '';
  contracts: Contract[] = [];
  protected currentInspection = this.inspectionsServices.currentInspection;
  _currentContract = this.contractsService.currentContract;
  currentContract: Contract = {} as Contract;
  carForm: FormControl;
  cars = [];
  currentStage: string;

  constructor() {
    this.currentStage =
      this.router.getCurrentNavigation()?.extras?.state?.['stage'];
    this.title = this.currentStage == 'checkin' ? ' Checkin' : ' Checkout';

    this.carForm = new FormControl(this.currentContract.idVehiculo || null);
    effect(() => {
      if (this.currentStage == 'checkin') {
        this.contracts = this.contractsService
          .contracts()
          .filter((x) => x.inspection?.idEstado == 48) as Contract[];
      } else {
        this.contracts = this.contractsService.contracts();
      }

      this.cars = this.contracts.map((a) => a.car) as [];

      this.currentContract = this.contractsService.currentContract();
    });
  }

  ngOnDestroy() {
    this._currentContract.set({} as Contract);
    this.currentInspection.set(undefined);
    this.cars = [];
  }
  //Establece el vehiculo en el estado global de la inspección actual
  selectContract(e: any) {
    const currentContract = this.contractsService
      .contracts()
      ?.find((x) => x.idVehiculo == e.value.idVehiculo) as Contract;

    this.contractsService.setCurrentContract(currentContract);
    const current = this.inspectionsServices
      .inspections()
      .find((x) => x.idContrato == currentContract.idContrato);
    if (this.currentStage == 'checkin' && current != undefined) {
      this.initializeCheckin(current);
    } else {
      this.initializeCheckout();
    }
  }

  private initializeCheckin(current: Inspection) {
    this.inspectionsServices.currentInspection.set(current);
    this.inspectionsServices.currentInspection.update((values) => {
      const current = { ...values };
      {
        current.stage = this.currentStage;
        current.odoEntrega = current.odoSalida;
        current.daniosEntrega = [];
        current.accesoriosEntrega = [];
      }
      return current as Inspection;
    });

    this.contractsService.currentContract.update((values) => {
      const current = { ...values };
      {
        if (current.car) {
          current.car.odometro = this.currentInspection()?.odoSalida;
        }
      }
      return current as Contract;
    });
  }
  private initializeCheckout() {
    this.inspectionsServices.currentInspection.update((values) => {
      const current = { ...values };
      {
        current.stage = this.currentStage;
        current.idVehiculo = this.contractsService.currentContract().idVehiculo;
        current.idContrato = this.contractsService.currentContract().idContrato;
        current.idCliente = this.contractsService.currentContract().idCliente;
        current.idAgenciaSalida =
          this.contractsService.currentContract().idAgenciaSalida;
        current.fechaSalida =
          this.contractsService.currentContract().fechaSalida;
        current.odoSalida =
          this.contractsService.currentContract().car?.odometro;
        current.nomRecibeVehiculo =
          this.contractsService.currentContract().customer?.nomCliente;
        current.daniosSalida = [];
        current.accesoriosSalida = [];
      }

      return current as Inspection;
    });
    console.log(this.inspectionsServices.currentInspection());
  }

  goToNext() {
    let carSet = undefined;
    let fuelSet = undefined;
    let odoSet = undefined;
    if (this.currentInspection()?.stage == 'checkin') {
      carSet = this.currentInspection()?.idVehiculo != undefined;
      fuelSet = this.currentInspection()?.combEntrega != null;
      odoSet = this.currentInspection()?.odoEntrega != null;
    } else {
      carSet = this.currentInspection()?.idVehiculo != undefined;
      fuelSet = this.currentInspection()?.combSalida != null;
      odoSet = this.currentInspection()?.odoSalida != null;
    }

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
      if (current.stage == 'checkin') {
        {
          current.odoEntrega = parseInt(e.target.value);
        }
      } else {
        {
          current.odoSalida = parseInt(e.target.value);
        }
      }

      return current as Inspection;
    });
  }

  setFuel(e: any) {
    this.inspectionsServices.currentInspection.update((values) => {
      const current = { ...values };
      if (current.stage == 'checkin') {
        {
          current.combEntrega = e.target.value.toString().trim();
        }
      } else {
        {
          current.combSalida = e.target.value.toString().trim();
        }
      }

      return current as Inspection;
    });
  }
}
