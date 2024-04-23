import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  computed,
  effect,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Inspection } from 'src/app/shared/interfaces/inspection';
import { CarsService } from 'src/app/shared/services/cars.service';
import { InspectionsService } from 'src/app/shared/services/inspections.service';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class GeneralDataComponent implements OnInit {
  //inyeccion de servicios
  private inspectionsServices = inject(InspectionsService);
  private carsService = inject(CarsService);

  //declaracion de propiedades
  _currentCar = this.carsService.currentCar;
  currentCar = computed(() => {
    return this._currentCar();
  });
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
    effect(() => {
      this.generalDataForm.controls;
    });
  }
  ngOnInit() {}

  protected showDamages(step: number) {
    this.addDamagesEvent.emit(step);
  }

  setOdometer(e: any) {
    this.inspectionsServices.currentInspection.update((values) => {
      const current = { ...values };
      {
        current.odoSalida = this.currentCar().odometro;
      }

      return current as Inspection;
    });
    this.carsService.currentCar.update((value) => {
      const current = { ...value };
      current.odometro = this.currentCar().odometro;
      return current;
    });
  }

  setFuel(e: any) {
    this.inspectionsServices.currentInspection.update((values) => {
      const current = { ...values };
      {
        current.combSalida = this.currentCar().fuel;
      }

      return current as Inspection;
    });

    this.carsService.currentCar.update((value) => {
      const current = { ...value };
      current.fuel = this.currentCar().fuel;
      return current;
    });
  }
}
