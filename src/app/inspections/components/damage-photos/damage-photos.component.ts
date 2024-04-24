import {
  Component,
  Input,
  OnInit,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Damage } from 'src/app/shared/interfaces/damage';
import { Inspection } from 'src/app/shared/interfaces/inspection';
import { AlertService } from 'src/app/shared/services/alert.service';
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
  private alertService = inject(AlertService);
  private inspectionsService = inject(InspectionsService);

  //declaracion de propiedades
  damageTypes = this.damageTypesService.damageTypes;
  @Input() damage = {} as Damage;
  constructor() {}

  ngOnInit() {}

  addDamage() {
    if (this.damage.idTipoDanio != null) {
      this.damage.foto = this.photoService.photos[0];
      this.photoService.clearPhotos();
      this.inspectionsService.currentInspection.update((values) => {
        const current = { ...values };
        {
          current.danios?.push(this.damage);
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
