import { Component, inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Car } from '../shared/interfaces/car';
import { Inspection } from '../shared/interfaces/inspection';
import { AccessoriesService } from '../shared/services/accessories.service';
import { AlertService } from '../shared/services/alert.service';
import { CarsService } from '../shared/services/cars.service';
import { DamagesService } from '../shared/services/damages.service';
import { InspectionsService } from '../shared/services/inspections.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.page.html',
  styleUrls: ['checkout.page.scss'],
})
export class CheckoutPage {
  //inyeccion de servicios
  private carsService = inject(CarsService);
  private inspectionsServices = inject(InspectionsService);
  private alertsService = inject(AlertService);
  private damagesService = inject(DamagesService);
  private accessoriesService = inject(AccessoriesService);

  //inyeccion de dependencias
  navCtlr = inject(NavController);

  //declaracion de propiedades
  cars = this.carsService.cars;
  step: number = 1;
  protected currentInspection = this.inspectionsServices.currentInspection;
  currentCar = this.carsService.currentCar;
  carForm: FormControl;

  constructor() {
    this.carForm = new FormControl(this.currentCar().idVehiculo || null);
  }

  selectCar(e: any) {
    if (this.step == 1) {
      //this.currentInspeccion.update((inspection)=>)
      const currentCar = this.carsService
        .cars()
        ?.find((x) => x.idVehiculo == e.value.idVehiculo) as Car;

      this.carsService.setCurrentCar(currentCar);
      this.inspectionsServices.currentInspection.update((values) => {
        const current = { ...values };
        current.idVehiculo = currentCar.idVehiculo;
        return current;
      });
    }
  }

  addDamagesEvent(e: any) {
    this.step = e;
  }

  goToNext() {
    switch (this.step) {
      case 1:
        if (this.currentInspection()?.idVehiculo != undefined) {
          if (this.carsService.currentCar().fuel == null) {
            this.alertsService.basicAlert(
              'Atención!',
              'No ha completado la información',
              ['Ok']
            );
          } else {
            this.step += 1;
          }
        } else {
          this.alertsService.basicAlert(
            'Atención!',
            'No ha seleccionado un vehículo',
            ['Ok']
          );
        }
        break;
      case 2:
        if (this.damagesService.damages().length == 0) {
          this.alertsService.basicAlert(
            'Atención!',
            'No ha registrado ningún daño. ¿Desea continuar?',
            [
              {
                text: 'Ok',
                role: 'ok',
                handler: () => {
                  this.step += 1;
                },
              },
              'Cancel',
            ]
          );
        } else {
          this.step += 1;
        }
        break;
      case 3:
        if (this.accessoriesService.currentAccessories().length == 0) {
          this.alertsService.basicAlert(
            'Atención!',
            'No ha registrado ningún accesorio. ¿Desea continuar?',
            [
              {
                text: 'Ok',
                role: 'ok',
                handler: () => {
                  this.step += 1;
                },
              },
              'Cancel',
            ]
          );
        }else {
          this.step += 1;
        }
        break;
    }
  }

  goToPrev() {
    this.step -= 1;
  }
}
