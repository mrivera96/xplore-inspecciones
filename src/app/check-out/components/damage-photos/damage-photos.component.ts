import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Damage } from 'src/app/shared/interfaces/damage';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DamageTypesService } from 'src/app/shared/services/damage-types.service';
import { DamagesService } from 'src/app/shared/services/damages.service';
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
  private damagesService = inject(DamagesService);
  private alertService = inject(AlertService);

  //declaracion de propiedades
  damageTypes = this.damageTypesService.damageTypes;
  @Input() damage = {} as Damage;
  @Output('damageAdded') damageAdded = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() {}

  addDamage() {
    if (this.damage.idTipoDanio != null) {
      this.damage.foto = this.photoService.photos[0];
      this.photoService.clearPhotos();
      this.damagesService.addDamage(this.damage);

      this.damageAdded.emit(true);
    } else {
      this.alertService.basicAlert(
        'Atención!',
        'Debe seleccionar un tipo de daño',
        ['Ok']
      );
    }
  }
}
