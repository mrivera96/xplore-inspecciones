import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { retry, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/api-response';
import { AutoPart } from '../interfaces/auto-part';
import { AlertService } from './alert.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AutoPartsService {
  //inyeccion de dependencias
  private httpClient = inject(HttpClient);
  private navCtrl = inject(NavController);

  //declara el endpoint de la API para el recurso
  private apiEndPoint = `${environment.apiUrl}/auto-parts`;

  //inyeccion de servicios
  private alertsService = inject(AlertService);

  //declaracion de signal a partir de los datos obtenidos
  autoParts = signal<AutoPart[]>([]);
  constructor() {
    const subsc = this.httpClient
      .get<ApiResponse>(`${this.apiEndPoint}/list`)
      .pipe(retry(3), shareReplay(1))
      .subscribe((res) => {
        this.autoParts.set(res.data);
        subsc.unsubscribe();
      });
  }

  async create(autoPart: AutoPart) {
    await this.alertsService.presentLoading();
    this.httpClient
      .post<ApiResponse>(`${this.apiEndPoint}/add`, autoPart)
      .subscribe({
        next: (res) => {
          this.alertsService.dismissDefaultLoading();
          this.autoParts.update((values) => {
            return [...(values as AutoPart[]), res.data as AutoPart];
          });

          this.navCtrl.navigateRoot('auto-parts');
          this.alertsService.basicAlert(
            'Éxito!',
            `Se guardado exitosamente la pieza: ${res.data.descPieza}.`,
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

  async update(autoPart: AutoPart) {
    await this.alertsService.presentLoading();
    this.httpClient
      .put<ApiResponse>(`${this.apiEndPoint}/update`, autoPart)
      .subscribe({
        next: (res) => {
          this.alertsService.dismissDefaultLoading();
          this.autoParts.update((values) => {
            return [...(values as AutoPart[]), res.data as AutoPart];
          });

          this.navCtrl.navigateRoot('auto-parts');
          this.alertsService.basicAlert(
            'Éxito!',
            `Se guardado exitosamente la pieza: ${res.data.descPieza}.`,
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
