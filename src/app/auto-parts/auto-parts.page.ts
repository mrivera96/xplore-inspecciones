import { Component, OnInit, inject } from '@angular/core';
import { AutoPartsService } from '../shared/services/auto-parts.service';
import { AutoPart } from '../shared/interfaces/auto-part';

@Component({
  selector: 'app-auto-parts',
  templateUrl: './auto-parts.page.html',
  styleUrls: ['./auto-parts.page.scss'],
})
export class AutoPartsPage implements OnInit {
  //inyeccion de servicios
  private autoPartsService = inject(AutoPartsService);

  //inyeccion de dependencias
  //declaracion de propiedades
  protected autoParts = this.autoPartsService.autoParts;

  constructor() {}

  ngOnInit() {}

  goToDetail(autoPart: AutoPart) {}
}
