import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faBuildingCircleArrowRight,
  faCalendar,
  faCamera,
  faCar,
  faCarBattery,
  faCircleDot,
  faCircleUser,
  faEllipsisVertical,
  faFileInvoice,
  faGasPump,
  faGauge,
  faIdCard,
  faMessage,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { NgxIonicImageViewerModule } from '@herdwatch-apps/ngx-ionic-image-viewer';
import { IonicModule, NavController } from '@ionic/angular';
import SignaturePad from 'signature_pad';
import { ToolbarComponent } from 'src/app/shared/components/toolbar/toolbar.component';
import { FuelTank } from 'src/app/shared/interfaces/fuel-tank';
import { Inspection } from 'src/app/shared/interfaces/inspection';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CarsService } from 'src/app/shared/services/cars.service';
import { ContractsService } from 'src/app/shared/services/contracts.service';
import { FuelTanksService } from 'src/app/shared/services/fuel-tanks.service';
import { InspectionsService } from 'src/app/shared/services/inspections.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    ToolbarComponent,
    FontAwesomeModule,
    CommonModule,
    NgxIonicImageViewerModule,
  ],
})
export class SigningComponent implements OnInit {
  //inyeccion de servicios
  inspectionsService = inject(InspectionsService);
  private alertsService = inject(AlertService);
  private fuelTanksService = inject(FuelTanksService);
  private contractsService = inject(ContractsService);
  private carsService = inject(CarsService);

  //inyeccion de dependencias
  private navCtrl = inject(NavController);
  router = inject(Router);

  //declaracion de propiedades
  notas: {
    emailCliente?: string;
    emailCC?: string;
  } = {};
  @ViewChild('canvas') canvasref!: ElementRef<HTMLCanvasElement>;
  canvas: HTMLCanvasElement | undefined = undefined;
  signaturePad: SignaturePad | undefined = undefined;
  currentInspection = this.inspectionsService.currentInspection;
  agency = faBuildingCircleArrowRight;
  gauge = faGauge;
  gas = faGasPump;
  bar = faBars;
  user = faCircleUser;
  car = faCar;
  contract = faFileInvoice;
  agent = faUserTie;
  licence = faIdCard;
  cam = faCamera;
  wheel = faCircleDot;
  battery = faCarBattery;
  options = faEllipsisVertical;
  calendar = faCalendar;
  message = faMessage;
  currentFuel: FuelTank | undefined = undefined;
  currentContract = this.contractsService.currentContract();
  currentCar = this.carsService.currentCar();
  protected photosDirectory = environment.imagesUrl;

  @ViewChild('signContainer') signContainer!: ElementRef<HTMLElement>;
  title: string;
  constructor() {
    effect(() => {
      if (this.currentInspection()?.stage == 'checkout') {
        this.currentFuel = this.fuelTanksService
          .fuelTanks()
          .find((x) => x.idTanqueComb == this.currentInspection()?.combSalida);
      } else {
        this.currentFuel = this.fuelTanksService
          .fuelTanks()
          .find((x) => x.idTanqueComb == this.currentInspection()?.combEntrega);
      }
    });
    this.title =
      this.inspectionsService.currentInspection()?.stage == 'checkin'
        ? ' Checkin'
        : ' Checkout';

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
        if (!this.signaturePad?.isEmpty()) {
          current.firmaClienteSalida =
            this.signaturePad?.toDataURL('image/png');
        }

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
