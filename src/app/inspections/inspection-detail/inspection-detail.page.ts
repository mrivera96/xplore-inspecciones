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
  faEllipsisVertical,
  faFileInvoice,
  faGasPump,
  faGauge,
  faIdCard,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { AccessoriesService } from 'src/app/shared/services/accessories.service';
import { NgxIonicImageViewerModule } from '@herdwatch-apps/ngx-ionic-image-viewer';
import { catchError, retry, shareReplay } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inspection-detail',
  templateUrl: './inspection-detail.page.html',
  styleUrls: ['./inspection-detail.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ToolbarComponent,
    FontAwesomeModule,
    NgxIonicImageViewerModule,
    RouterModule
  ],
})
export class InspectionDetailPage implements OnInit {
  //inyeccion de servicios
  private inspectionService = inject(InspectionsService);
  private accessoriesService = inject(AccessoriesService);
  private alertsService = inject(AlertService);

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
  battery = faCarBattery;
  options = faEllipsisVertical;
  protected accessories = this.accessoriesService.accessories;

  public actionSheetButtons = [
    {
      text: 'Imprimir',
      role: 'print',
      handler: () => {
        this.print();
      },
    },
  ];
  isActionSheetOpen: boolean = false;

  constructor() {
    this.accessories.update((values) => {
      const current = [...values];
      current.forEach((accessory) => {
        const accesories = this.currentInspection()?.checkout_accessories;
        if (
          accesories != undefined &&
          accesories.some((x) => x.idAccesorio == accessory.idAccesorio)
        ) {
          accessory.isInCheckout = true;
        }

        const checkinAccessory = this.currentInspection()?.checkin_accessories;
        if (
          checkinAccessory != undefined &&
          checkinAccessory.some((x) => x.idAccesorio == accessory.idAccesorio)
        ) {
          accessory.isInCheckin = true;
        }
      });

      return current;
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.inspectionService.currentInspection.set(undefined);
  }

  async print() {
    await this.alertsService.presentLoading();
    (
      await this.inspectionService.printInspection(
        this.currentInspection()?.idInspeccion!
      )
    )
      .pipe(
        retry(3),
        catchError((error) => {
          this.alertsService.dismissDefaultLoading();
          this.alertsService.basicAlert(
            'Error',
            `Ocurrió un error al conectarse al servidor: ${error.statusText}`,
            ['Ok']
          );
          return [];
        }),
        shareReplay(1)
      )
      .subscribe((response) => {
        this.alertsService.dismissDefaultLoading();
        const byteArray = new Uint8Array(
          atob(response.data)
            .split('')
            .map((char) => char.charCodeAt(0))
        );
        const file = new Blob([byteArray], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(file);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow!.print();
      });
  }

  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }

  logResult(ev: any) {
    console.log(JSON.stringify(ev.detail, null, 2));
  }
}
