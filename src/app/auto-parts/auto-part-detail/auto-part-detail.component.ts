import { Component, OnInit, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Observable, map } from 'rxjs';
import { ToolbarComponent } from 'src/app/shared/components/toolbar/toolbar.component';
import { AutoPart } from 'src/app/shared/interfaces/auto-part';
import { AutoPartsService } from 'src/app/shared/services/auto-parts.service';

@Component({
  selector: 'app-auto-part-detail',
  templateUrl: './auto-part-detail.component.html',
  styleUrls: ['./auto-part-detail.component.scss'],
  standalone: true,
  imports: [IonicModule, ToolbarComponent, FormsModule],
})
export class AutoPartDetailComponent implements OnInit {
  //inyeccion de servicios
  private autoPartsService = inject(AutoPartsService);

  //inyeccion de dependencias
  private navCtrl = inject(NavController);
  private activatedRoute = inject(ActivatedRoute);

  //declaracion de propiedades
  protected currentAutoPart: AutoPart = {} as AutoPart;
  protected title = 'Nueva Pieza';
  private id: Observable<number>;
  constructor() {
    this.id = this.activatedRoute.params.pipe(map((p) => p['id']));

    effect(() => {
      this.id.subscribe((next) => {
        if (next != undefined && next != null) {
          this.title = `Pieza No: ${next}`;
          this.currentAutoPart =
            this.autoPartsService.autoParts().find((x) => x.idPieza == next) ||
            ({} as AutoPart);
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
        this.autoPartsService.create(this.currentAutoPart);
      } else {
        this.autoPartsService.update(this.currentAutoPart);
      }
    });
  }
}
