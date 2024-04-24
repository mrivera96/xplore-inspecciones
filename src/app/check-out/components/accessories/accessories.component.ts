import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  computed,
  effect,
  inject,
} from '@angular/core';
import { AccessoriesService } from 'src/app/shared/services/accessories.service';
import { IonTitle } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { Accessory } from 'src/app/shared/interfaces/accessory';

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
  // currentAccessories = computed(()=>{
  //   this.accessories()?.filter(x=>x.idAccesorio == )
  // })
  currentAccessories = [] as Accessory[];

  constructor() {

  }

  ngOnInit() {}

  onAccessoryAdd(ev: any, accessory: Accessory) {
    if (ev.target.checked) {
      this.accessoriesServices.addCurrentAccessory(accessory);
    } else {
      this.accessoriesServices.removeCurrentAccessory(accessory);
    }
  }
}
