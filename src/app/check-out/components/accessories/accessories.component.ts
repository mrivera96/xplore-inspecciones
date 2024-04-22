import { Component, OnInit, inject } from '@angular/core';
import { AccessoriesService } from 'src/app/shared/services/accessories.service';
import { IonTitle } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AccessoriesComponent implements OnInit {
  //inyeccion de servicios
  private accessoriesServices = inject(AccessoriesService);

  //declaracion de propiedades
  protected accessories = this.accessoriesServices.accessories;

  constructor() {}

  ngOnInit() {}
}
