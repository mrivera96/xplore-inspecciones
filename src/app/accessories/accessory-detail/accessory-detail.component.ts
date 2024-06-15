import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Observable, map } from 'rxjs';
import { ToolbarComponent } from 'src/app/shared/components/toolbar/toolbar.component';
import { Accessory } from 'src/app/shared/interfaces/accessory';
import { AccessoriesService } from 'src/app/shared/services/accessories.service';

@Component({
  selector: 'app-accessory-detail',
  templateUrl: './accessory-detail.component.html',
  styleUrls: ['./accessory-detail.component.scss'],
  standalone: true,
  imports: [IonicModule, ToolbarComponent, FormsModule],
})
export class AccessoryDetailComponent implements OnInit {
  //inyeccion de servicios
  private accessoriesService = inject(AccessoriesService);

  //inyeccion de dependencias
  private navCtrl = inject(NavController);
  private activatedRoute = inject(ActivatedRoute);

  //declaracion de propiedades

  protected currentAccessory: Accessory = {} as Accessory;
  protected title = 'Nuevo Accesorio';
  private id: Observable<number>;

  constructor() {
    this.id = this.activatedRoute.params.pipe(map((p) => p['id']));

    effect(() => {
      this.id.subscribe((next) => {
        if (next != undefined && next != null) {
          this.title = `Accesorio No: ${next}`;
          this.currentAccessory =
            this.accessoriesService
              .accessories()
              .find((x) => x.idAccesorio == next) || ({} as Accessory);
        }
      });
    });
  }

  ngOnInit() {}

  goBack() {
    this.navCtrl.back();
  }

  save() {
    if (
      this.currentAccessory.idAccesorio != undefined &&
      this.currentAccessory.idAccesorio != null
    ) {
      this.accessoriesService.update(this.currentAccessory);
    } else {
      this.accessoriesService.create(this.currentAccessory);
    }
  }
}
