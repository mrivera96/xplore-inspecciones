import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { catchError, map, retry, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/api-response';
import { Contract } from '../interfaces/contract';
import { Inspection } from '../interfaces/inspection';
import { AccessoriesService } from './accessories.service';
import { AlertService } from './alert.service';
import { ContractsService } from './contracts.service';
import { DamagesService } from './damages.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})

/***********************************************************************************************
 * Servicio de inspecciones, se encarga de las get,post,put,delete de las inspoecciones
 * hacia la API y tambien se encarga de gestionar el estado global de las inspecciones
 * *********************************************************************************************/
export class InspectionsService {
  //inyecta el cliente para hacer peticiones HTTP
  private httpClient = inject(HttpClient);

  //declara el endpoint de la API para el recurso
  private apiEndPoint = `${environment.apiUrl}/inspections`;

  //inyeccion de servicios
  private alertsService = inject(AlertService);
  private contractsService = inject(ContractsService);
  private damagesService = inject(DamagesService);
  private accessoriesService = inject(AccessoriesService);

  //inyeccion de dependencias
  private navCtrl = inject(NavController);

  //declaracion de propiedades
  inspections = signal<Inspection[]>([]);
  currentInspection = signal<Inspection | undefined>(undefined);

  constructor() {
    const subsc = this.httpClient
      .get<ApiResponse>(`${this.apiEndPoint}/list`)
      .pipe(
        retry(3),
        catchError((error) => {
          this.alertsService.basicAlert(
            'Error',
            `Ocurrió un error al conectarse al servidor: ${error.statusText}`,
            ['Ok']
          );
          return [];
        }),
        shareReplay(1)
      )
      .subscribe((response) => {
        this.inspections.set(response.data as Inspection[]);
        subsc.unsubscribe();
      });
  }

  selectInspection(id: number) {
    const selectedInspection = this.inspections()?.find(
      (x) => x.idVehiculo == id
    );
    this.currentInspection.set(selectedInspection);
  }

  updateCurrentInspection(inspect: Inspection) {
    this.currentInspection.update(() => inspect);
  }

  async createInspection() {
    await this.alertsService.presentLoading();
    this.httpClient
      .post<ApiResponse>(`${this.apiEndPoint}/add`, this.currentInspection())
      .subscribe(
        (res) => {
          this.alertsService.dismissDefaultLoading();
          this.inspections.update((values) => {
            return [...values, res.data as Inspection];
          });

          this.clearState();
          this.alertsService.basicAlert(
            'Éxito!',
            `Se creó exitosamente la inspección No. : ${res.data.idInspeccion}`,
            [
              {
                text: 'Ok',
                role: 'ok',
                handler: () => {
                  this.navCtrl.navigateRoot(['tabs/home']);
                },
              },
            ]
          );
        },
        (error: any) => {
          this.alertsService.dismissDefaultLoading();
          this.alertsService.basicAlert(
            'Error',
            `Ocurrió un error al conectarse al servidor: ${error.statusText}`,
            ['Ok']
          );
        }
      );
  }

  clearState() {
    this.currentInspection.set(undefined);
    this.contractsService.currentContract.set({} as Contract);
    this.damagesService.damages.set([]);
    this.accessoriesService.currentAccessories.set([]);
  }
}
