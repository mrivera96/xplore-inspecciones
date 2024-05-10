import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import SignaturePad from 'signature_pad';
import { ToolbarComponent } from 'src/app/shared/components/toolbar/toolbar.component';
import { Customer } from 'src/app/shared/interfaces/customer';
import { Inspection } from 'src/app/shared/interfaces/inspection';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InspectionsService } from 'src/app/shared/services/inspections.service';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ToolbarComponent],
})
export class SigningComponent implements OnInit {
  //inyeccion de servicios
  inspectionsService = inject(InspectionsService);
  private alertsService = inject(AlertService);

  //inyeccion de dependencias
  private navCtrl = inject(NavController);
  router = inject(Router);

  //declaracion de propiedades
  notas: {
    comentariosLlantasDelanteras?: string;
    comentariosLlantasTraseras?: string;
    comentariosBateria?: string;
    emailCliente?: string;
    emailCC?: string;
  } = {};
  @ViewChild('canvas') canvasref!: ElementRef<HTMLCanvasElement>;
  canvas: HTMLCanvasElement | undefined = undefined;
  signaturePad: SignaturePad | undefined = undefined;
  currentInspection = this.inspectionsService.currentInspection;

  @ViewChild('signContainer') signContainer!: ElementRef<HTMLElement>;
  title: string;
  constructor() {
    this.title =
      this.inspectionsService.currentInspection()?.stage == 'checkin'
        ? ' Checkin'
        : ' Checkout';

    if (this.currentInspection()?.stage == 'checkin') {
      this.notas = {
        comentariosBateria: this.currentInspection()?.comentariosBateria,
        comentariosLlantasDelanteras:
          this.currentInspection()?.comentariosLlantasDelanteras,
        comentariosLlantasTraseras:
          this.currentInspection()?.comentariosLlantasTraseras,
      };
    }
    this.notas.emailCliente =
      this.currentInspection()?.stage === 'checkout'
        ? this.router.getCurrentNavigation()?.extras?.state?.['customer']
            ?.correoI || ''
        : this.currentInspection()?.correoCliente;
    this.notas.emailCC =
      this.currentInspection()?.stage === 'checkout'
        ? this.router.getCurrentNavigation()?.extras?.state?.['driver']
            ?.correoI || ''
        : this.currentInspection()?.correoCliente;
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.signaturePad?.clear();
    this.notas = {};
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasref.nativeElement;

    //const parentWidth = this.signContainer.nativeElement.offsetWidth;

    this.canvas.width = window.innerWidth * 0.7;

    this.signaturePad = new SignaturePad(this.canvas, {
      backgroundColor: '#f2f2f2',
    });
  }

  onClean() {
    this.signaturePad?.clear();
  }

  async goToNext() {
    if (this.signaturePad?.isEmpty()) {
      this.alertsService.basicAlert(
        'Atención!',
        '¿Desea finalizar inspección sin firma del cliente?',
        [
          {
            text: 'Ok',
            role: 'ok',
            handler: () => {
              if (this.currentInspection()?.stage == 'checkout') {
                this.saveCheckout();
              } else {
                this.saveCheckin();
              }
            },
          },
          'Cancel',
        ]
      );
    } else {
      if (this.currentInspection()?.stage == 'checkout') {
        this.saveCheckout();
      } else {
        this.saveCheckin();
      }
    }
  }

  saveCheckout() {
    this.currentInspection.update((values) => {
      const current = { ...values };
      {
        if(!this.signaturePad?.isEmpty()){

          current.firmaClienteSalida = this.signaturePad?.toDataURL('image/png');
        }
        current.comentariosLlantasDelanteras =
          this.notas.comentariosLlantasDelanteras;
        current.comentariosLlantasTraseras =
          this.notas.comentariosLlantasTraseras;
        current.comentariosBateria = this.notas.comentariosBateria;
        current.correoCliente = this.notas.emailCliente;
        current.correoConductor = this.notas.emailCC;
      }

      return current as Inspection;
    });

    this.inspectionsService.createInspection();
  }

  saveCheckin() {
    this.currentInspection.update((values) => {
      const current = { ...values };
      {
        current.firmaClienteEntrega = this.signaturePad?.toDataURL('image/png');
        current.comentariosLlantasDelanteras =
          this.notas.comentariosLlantasDelanteras;
        current.comentariosLlantasTraseras =
          this.notas.comentariosLlantasTraseras;
        current.comentariosBateria = this.notas.comentariosBateria;
        current.correoCliente = this.notas.emailCliente;
        current.correoConductor = this.notas.emailCC;
      }

      return current as Inspection;
    });

    this.inspectionsService.closeInspection();
  }

  goToPrev() {
    this.navCtrl.back();
  }
}
