import { Component, Input, OnInit, effect, inject } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { Damage } from 'src/app/shared/interfaces/damage';
import { DamagePartsService } from 'src/app/shared/services/damage-parts.service';
import { DamagesService } from 'src/app/shared/services/damages.service';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { DamagePhotosComponent } from '../damage-photos/damage-photos.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InspectionsService } from 'src/app/shared/services/inspections.service';

@Component({
  selector: 'app-damages',
  templateUrl: './damages.component.html',
  styleUrls: ['./damages.component.scss'],
  standalone: true,
  imports: [IonicModule, DamagePhotosComponent],
})
export class DamagesComponent implements OnInit {
  //inyeccion de servicios
  protected photoService = inject(PhotoService);
  private damagesService = inject(DamagesService);
  private damagePartsService = inject(DamagePartsService);
  private alertsService = inject(AlertService);
  private inspectionsService = inject(InspectionsService);

  //inyeccion de dependencias
  navCtrl = inject(NavController);

  //declaracion de propiedades

  protected damageParts = this.damagePartsService.damageParts;
  damages = this.damagesService.damages;
  damage = {} as Damage;

  constructor() {
    effect(() => {
      this.damageParts()?.forEach((x) => {
        x.count = this.currentInspection()?.daniosSalida.filter(
          (y) => x.idPieza == y.idPieza
        ).length;
      });
      this.damage = {} as Damage;
    });
  }

  currentInspection = this.inspectionsService.currentInspection;

  ngOnInit() {}

  ndOnDestroy() {
    this.damage = {} as Damage;
  }

  setDamagePart(idPieza: number) {
    this.damage.idPieza = idPieza;
    this.photoService.addNewToGallery();
  }

  goToNext() {
    if (this.currentInspection()?.daniosSalida.length == 0) {
      this.alertsService.basicAlert(
        'Atención!',
        'No ha registrado ningún daño. ¿Desea continuar?',
        [
          {
            text: 'Ok',
            role: 'ok',
            handler: () => {
              this.navCtrl.navigateForward(['/inspection/accessories']);
            },
          },
          'Cancel',
        ]
      );
    } else {
      this.navCtrl.navigateForward(['/inspection/accessories']);
    }
  }

  goToPrev() {
    this.navCtrl.back();
  }
}
