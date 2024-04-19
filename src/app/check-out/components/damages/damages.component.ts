import { Component, Input, OnInit, inject } from '@angular/core';
import { DamagePartsService } from 'src/app/services/damage-parts.service';
import { IonList } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { DamagePhotosComponent } from '../damage-photos/damage-photos.component';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-damages',
  templateUrl: './damages.component.html',
  styleUrls: ['./damages.component.scss'],
  standalone: true,
  imports: [IonicModule, DamagePhotosComponent],
})
export class DamagesComponent implements OnInit {
  @Input('step') currentStep: number = 3;

  private damagePartsService = inject(DamagePartsService);
  protected damageParts = this.damagePartsService.damageParts;
  protected photoService = inject(PhotoService);
  constructor() {}

  ngOnInit() {}

  setDamagePart() {
    this.photoService.addNewToGallery();
  }
}
