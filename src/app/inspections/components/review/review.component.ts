import { Component, OnInit, effect, inject } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { ContractsService } from 'src/app/shared/services/contracts.service';
import { InspectionsService } from 'src/app/shared/services/inspections.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class ReviewComponent implements OnInit {
  //inyeccion de servicios
  inspectionsService = inject(InspectionsService);
  contractsService = inject(ContractsService);


  //inyeccion de dependencias
  private navCtrl = inject(NavController);

  //declaracion de propiedades
  currentInspection = this.inspectionsService.currentInspection;
  currentContract = this.contractsService.currentContract;

  constructor() {
    effect(() => {
      console.log(this.currentInspection());
    });
  }

  ngOnInit() {}

  goToNext() {
    console.log(this.currentInspection());
  }

  goToPrev() {
    this.navCtrl.back();
  }
}
