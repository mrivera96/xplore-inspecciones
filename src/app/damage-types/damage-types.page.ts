import { Component, OnInit, inject } from '@angular/core';
import { DamageTypesService } from '../shared/services/damage-types.service';
import { DamageType } from '../shared/interfaces/damage-type';

@Component({
  selector: 'app-damage-types',
  templateUrl: './damage-types.page.html',
  styleUrls: ['./damage-types.page.scss'],
})
export class DamageTypesPage implements OnInit {
  //inyeccion de servicios
  private damageTypesService = inject(DamageTypesService);

  //inyeccion de dependencias
  //declaracion de propiedades
  protected damageTypes = this.damageTypesService.damageTypes;

  constructor() {}

  ngOnInit() {}

  goToDetail(damageType: DamageType) {}
}
