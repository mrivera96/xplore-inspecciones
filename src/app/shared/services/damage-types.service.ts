import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { catchError, retry, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/api-response';
import { DamageType } from '../interfaces/damage-type';
import { AlertService } from './alert.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DamageTypesService {
  //inyeccion de dependencias
  private httpClient = inject(HttpClient);
  private navCtrl = inject(NavController);

  //declara el endpoint de la API para el recurso
  private apiEndPoint = `${environment.apiUrl}/damage-types`;

  //inyeccion de servicios
  private alertsService = inject(AlertService);

  //declaracion de signal a partir de los datos obtenidos
  damageTypes = signal<DamageType[]>([]);
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
        const damageTypes = response.data as DamageType[];

        this.damageTypes.set(damageTypes);
        subsc.unsubscribe();
      });
  }

  async create(damageType: DamageType) {
    await this.alertsService.presentLoading();
    this.httpClient
      .post<ApiResponse>(`${this.apiEndPoint}/add`, damageType)
      .subscribe({
        next: (res) => {
          this.alertsService.dismissDefaultLoading();
          this.damageTypes.update((values) => {
            return [...(values as DamageType[]), res.data as DamageType];
          });

          this.navCtrl.navigateRoot('damage-types');
          this.alertsService.basicAlert(
            'Éxito!',
            `Se guardado exitosamente el tipo de daño: ${res.data.descTipoDanio}.`,
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

  async update(damageType: DamageType) {
    await this.alertsService.presentLoading();
    this.httpClient
      .put<ApiResponse>(`${this.apiEndPoint}/update`, damageType)
      .subscribe({
        next: (res) => {
          this.alertsService.dismissDefaultLoading();
          this.damageTypes.update((values) => {
            const current = [...values];
            const toUpdate = current.indexOf(damageType);
            current[toUpdate] = res.data as DamageType;
            return current;
          });

          this.navCtrl.navigateRoot('damage-types');
          this.alertsService.basicAlert(
            'Éxito!',
            `Se guardado exitosamente el tipo de daño: ${res.data.descTipoDanio}.`,
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
}
