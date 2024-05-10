import { Component, OnDestroy, effect, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Contract } from '../../shared/interfaces/contract';
import { Inspection } from '../../shared/interfaces/inspection';
import { AlertService } from '../../shared/services/alert.service';
import { ContractsService } from '../../shared/services/contracts.service';
import { InspectionsService } from '../../shared/services/inspections.service';
import { PhotoService } from '../../shared/services/photo.service';
import { FuelTanksService } from 'src/app/shared/services/fuel-tanks.service';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { CarsService } from 'src/app/shared/services/cars.service';
import { Car } from 'src/app/shared/interfaces/car';
@Component({
  selector: 'app-inspection-create',
  templateUrl: 'inspection-create.page.html',
  styleUrls: ['inspection-create.page.scss'],
})
export class InspectionCreatePage implements OnDestroy {
  //inyeccion de servicios
  private contractsService = inject(ContractsService);
  private inspectionsServices = inject(InspectionsService);
  private alertsService = inject(AlertService);
  private photoService = inject(PhotoService);
  private fuelTanksService = inject(FuelTanksService);
  private carsService = inject(CarsService);

  //inyeccion de dependencias
  navCtlr = inject(NavController);
  router = inject(Router);

  //declaracion de propiedades
  title = '';
  contracts: Contract[] = [];
  protected currentInspection = this.inspectionsServices.currentInspection;
  currentContract = this.contractsService.currentContract;
  currentCar = this.carsService.currentCar;

  cars = this.carsService.cars;
  currentStage: string;
  fuelTanks = this.fuelTanksService.fuelTanks;
  contract = faFileInvoice;
  currentFuel: number | undefined = undefined;

  constructor() {
    this.currentStage =
      this.router.getCurrentNavigation()?.extras?.state?.['stage'];
    this.title = this.currentStage == 'checkin' ? ' Checkin' : ' Checkout';

    effect(() => {
      console.log(this.currentInspection());
      if (this.currentStage == 'checkin') {
        this.contracts = this.contractsService
          .contracts()
          .filter((x) => x.inspection?.idEstado == 48) as Contract[];
      } else {
        this.contracts = this.contractsService
          .contracts()
          .filter((x) => x.inspection == undefined) as Contract[];
      }
    });
  }
  // ngOnInit() {
  //   this.carForm = new FormControl(null);
  // }

  ngOnDestroy() {
    this.currentInspection.set(undefined);
  }
  //Establece el vehiculo en el estado global de la inspección actual
  selectContract(e: any) {
    const currentContract = this.contractsService
      .contracts()
      ?.find((x) => x.idVehiculo == e.value.idVehiculo) as Contract;

    this.contractsService.setCurrentContract(currentContract);
    const current = this.inspectionsServices.inspections()!;

    if (this.currentStage == 'checkin' && current != undefined) {
      const currInspection = current.find(
        (x) => x.idContrato == currentContract.idContrato
      );
      this.initializeCheckin(currInspection as Inspection);
    } else {
      this.initializeCheckout();
    }
  }

  selectCar(e: any) {
    const currentCar = this.carsService
      .cars()
      ?.find((x) => x.idVehiculo == e.value.idVehiculo) as Car;

    this.carsService.currentCar.set(currentCar);
    this.inspectionsServices.currentInspection.update((values) => {
      const current = { ...values };
      {
        current.idVehiculo = this.carsService.currentCar().idVehiculo;
      }

      return current as Inspection;
    });

    this.currentFuel = undefined;
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

    this.carsService.currentCar.set(this.currentInspection()?.car as Car);
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
        current.photos = [];
      }

      return current as Inspection;
    });
    this.carsService.currentCar.set(this.currentContract().car as Car);

    this.currentFuel = this.currentContract().check_out_fuel?.idTanqueComb;
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
      this.navCtlr.navigateForward(['/inspections/create/photos']);
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

  addDocument() {
    this.photoService.addNewToGallery().then(() => {
      this.inspectionsServices.currentInspection.update((values) => {
        const current = { ...values };
        {
          current.fotoLicencia = this.photoService.photos()[0];
        }

        return current as Inspection;
      });
      this.photoService.clearPhotos();
    });
  }

  removeDocument() {
    this.inspectionsServices.currentInspection.update((values) => {
      const current = { ...values };
      {
        current.fotoLicencia = undefined;
      }

      return current as Inspection;
    });
  }
}
