import { Component, OnInit, inject } from '@angular/core';
import { AccessoriesService } from '../shared/services/accessories.service';
import { Accessory } from '../shared/interfaces/accessory';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.page.html',
  styleUrls: ['./accessories.page.scss'],
})
export class AccessoriesPage implements OnInit {
  //inyeccion de servicios
  private accessoriesService = inject(AccessoriesService);

  //inyeccion de dependencias
  //declaracion de propiedades
  protected accessories = this.accessoriesService.accessories;

  constructor() {}

  ngOnInit() {}

  goToDetail(accessory: Accessory){

  }
}
