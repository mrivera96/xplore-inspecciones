import { Component, OnInit, inject } from '@angular/core';
import { InspectionsService } from '../shared/services/inspections.service';

@Component({
  selector: 'app-inspection-review',
  templateUrl: './inspection-review.page.html',
  styleUrls: ['./inspection-review.page.scss'],
})
export class InspectionReviewPage implements OnInit {
  //inyeccion de servicios
  private inspectionService = inject(InspectionsService);

  //declaracion de propiedades
  protected currentInspection = this.inspectionService.currentInspection;
  protected photosDirectory ='http://190.4.56.14/inspApiDesa';

  constructor() {}

  ngOnInit() {}
}
