import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CarsService } from 'src/app/shared/services/cars.service';
import { InspectionsService } from 'src/app/shared/services/inspections.service';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class GeneralDataComponent implements OnInit {
  //inyeccion de servicios
  private inspectionsServices = inject(InspectionsService);
  private carsService = inject(CarsService);

  //declaracion de propiedades
  currentCar = this.carsService.currentCar;
  @Input('step') currentStep: number = 2;
  @Output() addDamagesEvent = new EventEmitter<number>();
  generalDataForm: FormGroup;
  protected currentInspection = this.inspectionsServices.currentInspection;

  constructor() {
    this.generalDataForm = new FormGroup({
      marca: new FormControl(this.currentCar().model.brand.descMarca),
      modelo: new FormControl(this.currentCar().modelo),
      nomCliente: new FormControl(
        this.currentCar().contract.customer.nomCliente
      ),
      correoI: new FormControl(this.currentCar().contract.customer.correoI),
      celularI: new FormControl(this.currentCar().contract.customer.celularI),
      numContrato: new FormControl(this.currentCar().contract.numContrato),
      odometro: new FormControl(this.currentCar().odometro),
      fuel: new FormControl(this.currentCar().fuel),
    });
  }
  ngOnInit() {}

  protected showDamages(step: number) {
    this.addDamagesEvent.emit(step);
  }

  setOdometer(e: any) {
    this.carsService.currentCar.update((value) => {
      const current = { ...value };
      current.odometro = e.target.value;
      return current;
    });
  }

  setFuel(e: any) {
    this.carsService.currentCar.update((value) => {
      const current = { ...value };
      current.fuel = e.target.value;
      return current;
    });
    console.log(this.carsService.currentCar());
  }
}
