import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  effect,
  inject,
} from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { ToolbarComponent } from 'src/app/shared/components/toolbar/toolbar.component';
import { AutoPart } from 'src/app/shared/interfaces/auto-part';
import { Damage } from 'src/app/shared/interfaces/damage';
import { Inspection } from 'src/app/shared/interfaces/inspection';
import { Photo } from 'src/app/shared/interfaces/photo';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AutoPartsService } from 'src/app/shared/services/auto-parts.service';
import { DamagesService } from 'src/app/shared/services/damages.service';
import { InspectionsService } from 'src/app/shared/services/inspections.service';
import { PhotoService } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  standalone: true,
  imports: [IonicModule, ToolbarComponent],
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

  //declaracion de propiedades
  title = '';
  protected autoParts = this.autoPartsService.autoParts;
  photo = {} as Photo;

  constructor() {
    this.title =
      this.inspectionsService.currentInspection()?.stage == 'checkin'
        ? ' Checkin'
        : ' Checkout';
    effect(() => {
      console.log(this.currentInspection());
      this.autoParts()?.forEach((x) => {
        if (this.currentInspection()?.stage == 'checkin') {
          x.count = this.currentInspection()?.photos?.filter(
            (y) => x.idPieza == y.idPieza && y.etapa == 'checkin'
          ).length;
        } else {
          x.count = this.currentInspection()?.photos?.filter(
            (y) => x.idPieza == y.idPieza && y.etapa == 'checkout'
          ).length;
        }
      });
      this.photo = {} as Photo;
    });
  }

  currentInspection = this.inspectionsService.currentInspection;

  ngOnInit() {}

  ngOnDestroy() {}

  goToNext() {
    this.navCtrl.navigateForward(['/inspections/create/accessories']);
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
