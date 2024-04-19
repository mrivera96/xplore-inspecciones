import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-damage-photos',
  templateUrl: './damage-photos.component.html',
  styleUrls: ['./damage-photos.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class DamagePhotosComponent implements OnInit {
  protected photoService = inject(PhotoService);
  constructor() {}

  ngOnInit() {}
}
