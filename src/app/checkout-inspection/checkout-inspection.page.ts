import { Component, inject } from '@angular/core';
import { CarsService } from '../services/cars.service';
import { Inspection } from '../interfaces/inspection';

@Component({
  selector: 'app-checkout-inspection',
  templateUrl: 'checkout-inspection.page.html',
  styleUrls: ['checkout-inspection.page.scss'],
})
export class CheckoutInspectionPage {
  private carsService = inject(CarsService);
  cars = this.carsService.filteredCars;
  title = '';
  protected newInspection = <Inspection> {};

  searchCar(e: any) {
    console.log(e)
    this.carsService.selectCar(e.value.idVehiculo)
  }
}
