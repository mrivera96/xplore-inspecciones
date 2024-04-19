import { Component, computed, inject } from '@angular/core';
import { CarsService } from '../services/cars.service';
import { Inspection } from '../interfaces/inspection';
import { InspectionsService } from '../services/inspections.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.page.html',
  styleUrls: ['checkout.page.scss'],
})
export class CheckoutPage {
  private carsService = inject(CarsService);
  private inspectionsServices = inject(InspectionsService);
  cars = this.carsService.filteredCars;
  step: number = 1;
  protected currentInspection = {} as Inspection;

  selectCar(e: any) {
    if (this.step == 1) {
      this.carsService.selectCar(e.value.idVehiculo);
      this.currentInspection.idVehiculo = e.value.idVehiculo;
      this.inspectionsServices.updateCurrentInspection(this.currentInspection);
    }
  }

  addDamagesEvent(e: any) {
    this.step = e;
  }
}
