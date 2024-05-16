import { Component, OnInit, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Observable, map } from 'rxjs';
import { ToolbarComponent } from 'src/app/shared/components/toolbar/toolbar.component';
import { DamageType } from 'src/app/shared/interfaces/damage-type';
import { DamageTypesService } from 'src/app/shared/services/damage-types.service';

@Component({
  selector: 'app-damage-type-detail',
  templateUrl: './damage-type-detail.component.html',
  styleUrls: ['./damage-type-detail.component.scss'],
  standalone: true,
  imports: [IonicModule, ToolbarComponent, FormsModule],
})
export class DamageTypeDetailComponent implements OnInit {
  //inyeccion de servicios
  private damageTypesService = inject(DamageTypesService);

  //inyeccion de dependencias
  private navCtrl = inject(NavController);
  private activatedRoute = inject(ActivatedRoute);

  //declaracion de propiedades
  protected currentDamageType: DamageType = {} as DamageType;

  protected title = 'Nuevo Tipo de Daño';
  private id: Observable<number>;

  constructor() {
    this.id = this.activatedRoute.params.pipe(map((p) => p['id']));

    effect(() => {
      this.id.subscribe((next) => {
        if (next != undefined && next != null) {
          this.title = `Tipo de Daño No: ${next}`;
          this.currentDamageType =
            this.damageTypesService
              .damageTypes()
              .find((x) => x.idTipoDanio == next) || ({} as DamageType);
        }
      });
    });
  }

  ngOnInit() {}

  goBack() {
    this.navCtrl.back();
  }

  save() {
    this.id.subscribe((next) => {
      if (next != undefined && next != null) {
        this.damageTypesService.create(this.currentDamageType);
      } else {
        this.damageTypesService.update(this.currentDamageType);
      }
    });
  }
}
