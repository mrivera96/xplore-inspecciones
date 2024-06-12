import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxIonicImageViewerModule } from '@herdwatch-apps/ngx-ionic-image-viewer';
import { IonicModule } from '@ionic/angular';
import { Damage } from 'src/app/shared/interfaces/damage';
import { DamageType } from 'src/app/shared/interfaces/damage-type';
import { Inspection } from 'src/app/shared/interfaces/inspection';
import { Photo } from 'src/app/shared/interfaces/photo';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DamageTypesService } from 'src/app/shared/services/damage-types.service';
import { InspectionsService } from 'src/app/shared/services/inspections.service';
import { PhotoService } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'app-photo-damage',
  templateUrl: './photo-damage.component.html',
  styleUrls: ['./photo-damage.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, NgxIonicImageViewerModule],
})
export class PhotoDamageComponent implements OnInit {
  //inyeccion de servicios
  protected photoService = inject(PhotoService);
  private damageTypesService = inject(DamageTypesService);
  private alertService = inject(AlertService);
  private inspectionsService = inject(InspectionsService);

  //declaracion de propiedades
  damageTypes = this.damageTypesService.damageTypes;
  protected damage = {} as Damage;
  @Input('photo') photo = {} as Photo;
  @Output('photoEvent') photoEvent = new EventEmitter<Photo>();

  constructor() {}

  ngOnInit() {}

  addDamage() {
    if (this.damage.idTipoDanio != null) {
      this.damage.damage_type = this.damageTypes()?.find(
        (x) => x.idTipoDanio == this.damage.idTipoDanio
      ) as DamageType;
      this.damage.damage_part = this.photo.auto_part;
      this.photoService.clearPhotos();
      this.photo.damage = this.damage;
      this.inspectionsService.currentInspection.update((values) => {
        const current = { ...values };
        {
          current.photos?.push(this.photo);
        }

        return current as Inspection;
      });

      this.photoEvent.emit({} as Photo);
    } else {
      this.alertService.basicAlert(
        'Atención!',
        'Debe seleccionar un tipo de daño',
        ['Ok']
      );
    }
  }
}
