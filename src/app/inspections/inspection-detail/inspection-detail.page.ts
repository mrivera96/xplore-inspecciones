import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { InspectionsService } from '../../shared/services/inspections.service';
import { ToolbarComponent } from 'src/app/shared/components/toolbar/toolbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faBuildingCircleArrowRight,
  faCamera,
  faCar,
  faCarBattery,
  faCircleDot,
  faCircleUser,
  faFileInvoice,
  faGasPump,
  faGauge,
  faIdCard,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { AccessoriesService } from 'src/app/shared/services/accessories.service';

@Component({
  selector: 'app-inspection-detail',
  templateUrl: './inspection-detail.page.html',
  styleUrls: ['./inspection-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ToolbarComponent, FontAwesomeModule],
})
export class InspectionDetailPage implements OnInit {
  //inyeccion de servicios
  private inspectionService = inject(InspectionsService);
  private accessoriesService = inject(AccessoriesService);

  //declaracion de propiedades
  protected currentInspection = this.inspectionService.currentInspection;
  protected photosDirectory = environment.imagesUrl;
  agency = faBuildingCircleArrowRight;
  gauge = faGauge;
  gas = faGasPump;
  bar = faBars;
  user = faCircleUser;
  car = faCar;
  contract = faFileInvoice;
  agent = faUserTie;
  licence = faIdCard;
  cam = faCamera;
  wheel = faCircleDot;
  battery = faCarBattery;
  protected accessories = this.accessoriesService.accessories;

  constructor() {
    this.accessories.update((values) => {
      const current = [...values];
      current.forEach((accessory) => {
        const accesories = this.currentInspection()?.checkout_accessories;
        if (
          accesories != undefined &&
          accesories.some((x) => x.idAccesorio == accessory.idAccesorio)
        ) {
          accessory.isInCheckout = true;
        }

        const checkinAccessory = this.currentInspection()?.checkin_accessories;
        if (
          checkinAccessory != undefined &&
          checkinAccessory.some((x) => x.idAccesorio == accessory.idAccesorio)
        ) {
          accessory.isInCheckin = true;
        }
      });

      return current;
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.inspectionService.currentInspection.set(undefined);
  }
}
