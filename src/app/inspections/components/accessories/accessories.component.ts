import { Component, OnInit, effect, inject } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { Accessory } from 'src/app/shared/interfaces/accessory';
import { Inspection } from 'src/app/shared/interfaces/inspection';
import { AccessoriesService } from 'src/app/shared/services/accessories.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InspectionsService } from 'src/app/shared/services/inspections.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AccessoriesComponent implements OnInit {
  //inyeccion de servicios
  private accessoriesService = inject(AccessoriesService);
  private alertsService = inject(AlertService);
  private inspectionsService = inject(InspectionsService);

  //inyeccion de dependencias
  private navCtrl = inject(NavController);

  //declaracion de propiedades
  protected accessories = this.accessoriesService.accessories;
  currentInspection = this.inspectionsService.currentInspection;

  constructor() {}

  ngOnInit() {}

  onAccessoryAdd(ev: any, accessory: Accessory) {
    if (ev.target.checked) {
      this.accessoriesService.addCurrentAccessory(accessory);
      this.inspectionsService.currentInspection.update((values) => {
        const current = { ...values };
        {
          current.accesoriosSalida?.push(accessory);
        }

        return current as Inspection;
      });
    } else {
      this.inspectionsService.currentInspection.update((values) => {
        const current = { ...values };
        {
          current.accesoriosSalida = current.accesoriosSalida?.filter(
            (x) => x.idAccesorio != accessory.idAccesorio
          );
        }

        return current as Inspection;
      });
    }
  }

  goToNext() {
    if (this.currentInspection()?.accesoriosSalida.length == 0) {
      this.alertsService.basicAlert(
        'Atención!',
        'No ha registrado ningún accesorio. ¿Desea continuar?',
        [
          {
            text: 'Ok',
            role: 'ok',
            handler: () => {
              this.navCtrl.navigateForward(['/inspection/signing']);
            },
          },
          'Cancel',
        ]
      );
    } else {
      this.navCtrl.navigateForward(['/inspection/signing']);
    }
  }
  goToPrev() {
    this.navCtrl.back();
  }
}
