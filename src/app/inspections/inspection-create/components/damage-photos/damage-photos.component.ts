import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Damage } from 'src/app/shared/interfaces/damage';
import { DamagePart } from 'src/app/shared/interfaces/damage-part';
import { DamageType } from 'src/app/shared/interfaces/damage-type';
import { Inspection } from 'src/app/shared/interfaces/inspection';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DamagePartsService } from 'src/app/shared/services/damage-parts.service';
import { DamageTypesService } from 'src/app/shared/services/damage-types.service';
import { InspectionsService } from 'src/app/shared/services/inspections.service';
import { PhotoService } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'app-damage-photos',
  templateUrl: './damage-photos.component.html',
  styleUrls: ['./damage-photos.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class DamagePhotosComponent implements OnInit {
  //inyeccion de servicios
  protected photoService = inject(PhotoService);
  private damageTypesService = inject(DamageTypesService);
  private damagepartsService = inject(DamagePartsService);
  private alertService = inject(AlertService);
  private inspectionsService = inject(InspectionsService);

  //declaracion de propiedades
  damageTypes = this.damageTypesService.damageTypes;
  damageParts = this.damagepartsService.damageParts;
  @Input() damage = {} as Damage;
  constructor() {}

  ngOnInit() {}

  addDamage() {
    if (this.damage.idTipoDanio != null) {
      this.damage.foto = this.photoService.photos[0];
      this.damage.tipoDanio = this.damageTypes()?.find(
        (x) => x.idTipoDanio == this.damage.idDanio
      ) as DamageType;
      this.damage.pieza = this.damageParts()?.find(
        (x) => x.idPieza == this.damage.idPieza
      ) as DamagePart;
      this.photoService.clearPhotos();
      this.inspectionsService.currentInspection.update((values) => {
        const current = { ...values };
        {
          if (current.stage == 'checkout') {
            current.daniosSalida?.push(this.damage);
          } else {
            current.daniosEntrega?.push(this.damage);
          }
        }

        return current as Inspection;
      });
    } else {
      this.alertService.basicAlert(
        'Atención!',
        'Debe seleccionar un tipo de daño',
        ['Ok']
      );
    }
  }
}
