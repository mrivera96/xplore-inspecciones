import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { catchError, map, shareReplay } from 'rxjs';
import SignaturePad from 'signature_pad';
import { Inspection } from 'src/app/shared/interfaces/inspection';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InspectionsService } from 'src/app/shared/services/inspections.service';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class SigningComponent implements OnInit {
  //inyeccion de servicios
  inspectionsService = inject(InspectionsService);
  private alertsService = inject(AlertService);

  //inyeccion de dependencias
  private navCtrl = inject(NavController);

  //declaracion de propiedades
  notas: {
    comentariosLlantasDelanteras?: string;
    comentariosLlantasTraseras?: string;
    comentariosBateria?: string;
  } = {};
  @ViewChild('canvas') canvasref!: ElementRef<HTMLCanvasElement>;
  canvas: HTMLCanvasElement | undefined = undefined;
  signaturePad: SignaturePad | undefined = undefined;
  currentInspection = this.inspectionsService.currentInspection;

  @ViewChild('signContainer') signContainer!: ElementRef<HTMLElement>;
  constructor() {}

  ngOnInit() {}
  ngOnDestroy() {
    this.signaturePad?.clear();
    this.notas = {};
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasref.nativeElement;

    //const parentWidth = this.signContainer.nativeElement.offsetWidth;

    this.canvas.width = window.innerWidth * 0.7;
    // console.log(parentWidth);

    this.signaturePad = new SignaturePad(this.canvas, {
      backgroundColor: 'white',
    });
  }

  onClean() {
    this.signaturePad?.clear();
  }

  async goToNext() {
    if (this.signaturePad?.isEmpty()) {
      this.alertsService.basicAlert(
        'Atención!',
        'No ha registrado ninguna firma.',
        ['Ok']
      );
    } else {
      this.currentInspection.update((values) => {
        const current = { ...values };
        {
          current.firmaClienteSalida =
            this.signaturePad?.toDataURL('image/png');
          current.comentariosLlantasDelanteras =
            this.notas.comentariosLlantasDelanteras;
          current.comentariosLlantasTraseras =
            this.notas.comentariosLlantasTraseras;
          current.comentariosBateria = this.notas.comentariosBateria;
        }

        return current as Inspection;
      });

      this.inspectionsService.createInspection();
    }
  }

  goToPrev() {
    this.navCtrl.back();
  }
}
