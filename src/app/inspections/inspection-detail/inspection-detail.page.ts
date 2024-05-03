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
  battery = faCarBattery
  constructor() {}

  ngOnInit() {}
}
