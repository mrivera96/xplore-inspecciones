import { Component, OnInit, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { ToolbarComponent } from 'src/app/shared/components/toolbar/toolbar.component';
import { Accessory } from 'src/app/shared/interfaces/accessory';
import { Customer } from 'src/app/shared/interfaces/customer';
import { Inspection } from 'src/app/shared/interfaces/inspection';
import { AccessoriesService } from 'src/app/shared/services/accessories.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InspectionsService } from 'src/app/shared/services/inspections.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss'],
  standalone: true,
  imports: [IonicModule, ToolbarComponent],
})
export class AccessoriesComponent implements OnInit {
  //inyeccion de servicios
  private accessoriesService = inject(AccessoriesService);
  private alertsService = inject(AlertService);
  private inspectionsService = inject(InspectionsService);

  //inyeccion de dependencias
  private navCtrl = inject(NavController);
  private router = inject(Router);

  //declaracion de propiedades
  protected accessories = this.accessoriesService.accessories();
  currentInspection = this.inspectionsService.currentInspection;
  title: string;
  customer: Customer;
  driver: Customer;

  constructor() {
    this.title =
      this.inspectionsService.currentInspection()?.stage == 'checkin'
        ? ' Checkin'
        : ' Checkout';

    effect(() => {
      this.accessories.map((accessory) => {
        const current = { ...accessory };

        const checkoutAccesories =
          this.currentInspection()?.stage == 'checkin'
            ? this.currentInspection()?.checkout_accessories
            : this.currentInspection()?.accesoriosSalida;

        const checkinAccesories = this.currentInspection()?.accesoriosEntrega;
        if (
          checkoutAccesories != undefined &&
          checkoutAccesories.some((x) => x.idAccesorio == accessory.idAccesorio)
        ) {
          accessory.isInCheckout = true;
        }

        if (
          checkinAccesories != undefined &&
          checkinAccesories.some((x) => x.idAccesorio == accessory.idAccesorio)
        ) {
          accessory.isInCheckin = true;
        }

        return current;
      });
    });

    this.customer =
      this.router.getCurrentNavigation()?.extras?.state?.['customer'];
    this.driver = this.router.getCurrentNavigation()?.extras?.state?.['driver'];
  }

  ngOnInit() {}

  onAccessoryAdd(ev: any, accessory: Accessory) {
    if (ev.target.checked) {
      this.accessoriesService.addCurrentAccessory(accessory);
      this.inspectionsService.currentInspection.update((values) => {
        const current = { ...values };
        {
          if (current.stage == 'checkout') {
            current.accesoriosSalida?.push(accessory);
          } else {
            current.accesoriosEntrega?.push(accessory);
          }
        }

        return current as Inspection;
      });
    } else {
      this.inspectionsService.currentInspection.update((values) => {
        const current = { ...values };
        {
          if (current.stage == 'checkout') {
            current.accesoriosSalida = current.accesoriosSalida?.filter(
              (x) => x.idAccesorio != accessory.idAccesorio
            );
          } else {
            current.accesoriosEntrega = current.accesoriosEntrega?.filter(
              (x) => x.idAccesorio != accessory.idAccesorio
            );
          }
        }

        return current as Inspection;
      });
    }
  }

  goToNext() {
    const validator =
      this.currentInspection()?.stage == 'checkout'
        ? this.currentInspection()?.accesoriosSalida.length
        : this.currentInspection()?.accesoriosEntrega.length;
    if (validator == 0) {
      this.alertsService.basicAlert(
        'Atención!',
        'No ha registrado ningún accesorio. ¿Desea continuar?',
        [
          {
            text: 'Ok',
            role: 'ok',
            handler: () => {
              this.navCtrl.navigateForward(['/inspections/create/notes'], {
                state: {
                  customer: this.customer,
                  driver: this.driver,
                },
              });
            },
          },
          'Cancel',
        ]
      );
    } else {
      this.navCtrl.navigateForward(['/inspections/create/notes'], {
        state: {
          customer: this.customer,
          driver: this.driver,
        },
      });
    }
  }
  goToPrev() {
    this.navCtrl.back();
  }
}
