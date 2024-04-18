import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonContent } from '@ionic/angular/standalone';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule, FormsModule],
})
export class GeneralDataComponent implements OnInit {
  private carsServices = inject(CarsService);
  protected currentCar = this.carsServices.currentCar;
  constructor() {}

  ngOnInit() {}
}
