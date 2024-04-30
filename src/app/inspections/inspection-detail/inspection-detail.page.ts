import { Component, OnInit, inject } from '@angular/core';
import { InspectionsService } from '../../shared/services/inspections.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inspection-detail',
  templateUrl: './inspection-detail.page.html',
  styleUrls: ['./inspection-detail.page.scss'],
})
export class InspectionReviewPage implements OnInit {
  //inyeccion de servicios
  private inspectionService = inject(InspectionsService);

  //declaracion de propiedades
  protected currentInspection = this.inspectionService.currentInspection;
  protected photosDirectory = environment.imagesUrl;

  constructor() {}

  ngOnInit() {}
}
