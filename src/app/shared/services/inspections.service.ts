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
import { Router } from '@angular/router';
import { CarsService } from './cars.service';
import { Car } from '../interfaces/car';

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
  private carsService = inject(CarsService);

  //inyeccion de dependencias
  private navCtrl = inject(NavController);
  private router = inject(Router);

  //declaracion de propiedades
  inspections = signal<Inspection[] | undefined>(undefined);
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

  updateCurrentInspection(inspect: Inspection) {
    this.currentInspection.update(() => inspect);
  }

  async createInspection() {
    await this.alertsService.presentLoading();
    this.httpClient
      .post<ApiResponse>(`${this.apiEndPoint}/add`, this.currentInspection())
      .subscribe({
        next: (res) => {
          this.alertsService.dismissDefaultLoading();
          this.inspections.update((values) => {
            return [...(values as Inspection[]), res.data as Inspection];
          });
          this.contractsService.contracts.update((values) => {
            const current = [...values];
            const idx = current.findIndex(
              (x) => x.idContrato == this.currentInspection()?.idContrato
            );
            current[idx].inspection = res.data as Inspection;
            return current;
          });

          this.clearState();
          this.navCtrl.navigateRoot('home');
          this.alertsService.basicAlert(
            'Éxito!',
            `Inspección ${res.data.numInspeccion} - guardada exitosamente. Vehículo: ${res.data.car.nemVehiculo} | Contrato No.: ${res.data.contract.numContrato}.`,
            ['Ok']
          );
        },
        error: (error: any) => {
          this.alertsService.dismissDefaultLoading();
          this.alertsService.basicAlert(
            'Error',
            `Ocurrió un error al conectarse al servidor: ${error.statusText}`,
            ['Ok']
          );
        },
      });
  }

  async closeInspection() {
    await this.alertsService.presentLoading();
    this.httpClient
      .post<ApiResponse>(`${this.apiEndPoint}/close`, this.currentInspection())
      .subscribe(
        (res) => {
          this.alertsService.dismissDefaultLoading();
          this.inspections.update((values) => {
            const current = [...(values as Inspection[])];
            const idx = current.findIndex(
              (x) => x.idInspeccion == this.currentInspection()?.idInspeccion
            );
            current[idx] = res.data as Inspection;
            return current;
          });

          this.contractsService.contracts.update((values) => {
            const current = [...values];
            const idx = current.findIndex(
              (x) => x.idContrato == this.currentInspection()?.idContrato
            );
            current[idx].inspection = res.data as Inspection;
            return current;
          });

          this.clearState();
          this.navCtrl.navigateRoot('home');
          this.alertsService.basicAlert(
            'Éxito!',
            `Inspección ${res.data.numInspeccion} - cerrada exitosamente. Vehículo: ${res.data.car.nemVehiculo} | Contrato No.: ${res.data.contract.numContrato}.`,
            ['Ok']
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

  async printInspection(inspectionId: number) {
    return this.httpClient
      .get<ApiResponse>(
        `${this.apiEndPoint}/print?idInspeccion=${inspectionId}`
      )
      
  }

  clearState() {
    this.currentInspection.set(undefined);
    this.contractsService.currentContract.set({} as Contract);
    this.damagesService.damages.set([]);
    this.accessoriesService.currentAccessories.set([]);
    this.carsService.currentCar.set({} as Car);
  }
}
