import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonContent } from '@ionic/angular/standalone';
import { CarsService } from 'src/app/services/cars.service';
import { InspectionsService } from 'src/app/services/inspections.service';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class GeneralDataComponent implements OnInit {
  private carsServices = inject(CarsService);
  private inspectionsServices = inject(InspectionsService);
  protected currentCar = this.carsServices.currentCar;

  @Input('step') currentStep: number = 2;
  @Output() addDamagesEvent = new EventEmitter<number>();
  protected currentInspection = this.inspectionsServices.getCurrentInspection();

  ngOnInit() {}

  protected showDamages(step: number) {
    this.addDamagesEvent.emit(step);
  }
}
