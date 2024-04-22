import {
  Component,
  Input,
  OnInit,
  effect,
  inject
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Damage } from 'src/app/shared/interfaces/damage';
import { DamagePartsService } from 'src/app/shared/services/damage-parts.service';
import { DamagesService } from 'src/app/shared/services/damages.service';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { DamagePhotosComponent } from '../damage-photos/damage-photos.component';

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

  //declaracion de propiedades
  @Input('step') currentStep: number = 3;

  protected damageParts = this.damagePartsService.damageParts;
  damages = this.damagesService.damages;
  damage = {} as Damage;

  constructor() {
    effect(() => {
      this.damageParts()?.forEach((x) => {
        x.count = this.damagesService
          .damages()
          .filter((y) => x.idPieza == y.idPieza).length;
      });
      this.damage = {} as Damage;
    });
  }

  ngOnInit() {}

  setDamagePart(idPieza: number) {
    this.damage.idPieza = idPieza;
    this.photoService.addNewToGallery();
  }
}
