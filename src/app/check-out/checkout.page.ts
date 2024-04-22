import { Component, computed, inject, signal } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Inspection } from '../interfaces/inspection';
import { CarsService } from '../services/cars.service';
import { InspectionsService } from '../services/inspections.service';
import { Car } from '../interfaces/car';
@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.page.html',
  styleUrls: ['checkout.page.scss'],
})
export class CheckoutPage {
  //inyeccion de servicios
  private carsService = inject(CarsService);
  private inspectionsServices = inject(InspectionsService);

  //inyeccion de dependencias
  navCtlr = inject(NavController);

  //declaracion de propiedades
  cars = this.carsService.cars;
  step: number = 1;
  protected currentInspection = {} as Inspection;

  currentCar: Car | undefined = {} as Car;

  constructor() {}

  selectCar(e: any) {
    if (this.step == 1) {
      //this.currentInspeccion.update((inspection)=>)
      this.currentCar = this.carsService
        .cars()
        ?.find((x) => x.idVehiculo == e.value.idVehiculo);
      this.currentInspection.idVehiculo = e.value.idVehiculo;
      this.inspectionsServices.updateCurrentInspection(this.currentInspection);
    }
  }

  addDamagesEvent(e: any) {
    this.step = e;
  }

  goToNext() {
    switch (this.step) {
      case 1:
        if (this.currentInspection.idVehiculo != undefined) {
          this.step += 1;
        }
        break;
      case 2:
        this.step += 1;
        break;
    }
  }

  goToPrev() {
    this.step -= 1;
  }
}
