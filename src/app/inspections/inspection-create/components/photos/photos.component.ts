import { Component, OnDestroy, OnInit, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxIonicImageViewerModule } from '@herdwatch-apps/ngx-ionic-image-viewer';
import { IonicModule, NavController } from '@ionic/angular';
import { ToolbarComponent } from 'src/app/shared/components/toolbar/toolbar.component';
import { AutoPart } from 'src/app/shared/interfaces/auto-part';
import { Customer } from 'src/app/shared/interfaces/customer';
import { Inspection } from 'src/app/shared/interfaces/inspection';
import { Photo } from 'src/app/shared/interfaces/photo';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AutoPartsService } from 'src/app/shared/services/auto-parts.service';
import { DamagesService } from 'src/app/shared/services/damages.service';
import { InspectionsService } from 'src/app/shared/services/inspections.service';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { environment } from 'src/environments/environment';
import { PhotoDamageComponent } from '../photo-damage/photo-damage.component';
import { Damage } from 'src/app/shared/interfaces/damage';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ToolbarComponent,
    NgxIonicImageViewerModule,
    PhotoDamageComponent,
  ],
})
export class PhotosComponent implements OnInit, OnDestroy {
  //inyeccion de servicios
  protected photoService = inject(PhotoService);
  private damagesService = inject(DamagesService);
  private autoPartsService = inject(AutoPartsService);
  private alertsService = inject(AlertService);
  private inspectionsService = inject(InspectionsService);

  //inyeccion de dependencias
  navCtrl = inject(NavController);
  router = inject(Router);

  //declaracion de propiedades
  title = '';
  protected autoParts = this.autoPartsService.autoParts;
  photo = {} as Photo;
  protected photosDirectory = environment.imagesUrl;
  customer: Customer;
  driver: Customer;

  constructor() {
    this.title =
      this.inspectionsService.currentInspection()?.stage == 'checkin'
        ? ' Checkin'
        : ' Checkout';
    effect(() => {
      console.log(this.currentInspection());
      this.autoParts()?.forEach((x) => {
        x.count = this.currentInspection()?.photos?.filter(
          (y) => x.idPieza == y.idPieza
        ).length;
      });
      this.photo = {} as Photo;
    });
    this.customer =
      this.router.getCurrentNavigation()?.extras?.state?.['customer'];
    this.driver = this.router.getCurrentNavigation()?.extras?.state?.['driver'];
  }

  currentInspection = this.inspectionsService.currentInspection;

  ngOnInit() {}

  ngOnDestroy() {}

  goToNext() {
    this.navCtrl.navigateForward(['/inspections/create/accessories'], {
      state: {
        customer: this.customer,
        driver: this.driver,
      },
    });
  }

  goToPrev() {
    this.navCtrl.back();
  }

  removePhoto(photo: any) {
    this.inspectionsService.currentInspection.update((values) => {
      const current = { ...values };
      {
        current.photos = current.photos?.filter((x) => x.foto != photo);
      }

      return current as Inspection;
    });
  }

  async addPhoto(part: AutoPart) {
    await this.photoService.addNewToGallery();
    this.photo.foto = this.photoService.photos()[0];

    this.photo.auto_part = part;
    this.photo.idPieza = part.idPieza;
    this.photo.etapa = this.currentInspection()?.stage;
    if (this.currentInspection()?.stage === 'checkout') {
      this.photoService.clearPhotos();
      this.inspectionsService.currentInspection.update((values) => {
        const current = { ...values };
        {
          current.photos?.push(this.photo);
        }

        return current as Inspection;
      });
      this.photo = {} as Photo;
    }
  }

  onDamageAdd(photo: Photo) {
    this.photo = photo;
  }
}
