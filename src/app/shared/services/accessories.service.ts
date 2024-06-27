import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { ApiResponse } from '../interfaces/api-response';
import { catchError, map, retry, shareReplay } from 'rxjs';
import { Accessory } from '../interfaces/accessory';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AccessoriesService {
  //inyeccion de dependencias
  private httpClient = inject(HttpClient);
  private navCtrl = inject(NavController);

  //declara el endpoint de la API para el recurso
  private apiEndPoint = `${environment.apiUrl}/accessories`;

  //inyeccion de servicios
  private alertsService = inject(AlertService);

  //declaracion de signal a partir de los vehiculos
  accessories = signal<Accessory[]>([]);
  currentAccessories = signal<Accessory[]>([]);
  constructor() {
    this.loadData();
  }

  public loadData() {
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
        const accesories = response.data as Accessory[];

        this.accessories.set(accesories);
        subsc.unsubscribe();
      });
  }

  addCurrentAccessory(accessory: Accessory) {
    const exists = this.currentAccessories().some(
      (x) => x.idAccesorio == accessory.idAccesorio
    );
    if (!exists) {
      this.currentAccessories.update((values) => {
        return [...values, accessory];
      });
    }
  }

  removeCurrentAccessory(accessory: Accessory) {
    this.currentAccessories.update((values) => {
      return values.filter((x) => x.idAccesorio != accessory.idAccesorio);
    });
  }

  async create(accessory: Accessory) {
    await this.alertsService.presentLoading();
    this.httpClient
      .post<ApiResponse>(`${this.apiEndPoint}/add`, accessory)
      .subscribe({
        next: (res) => {
          this.alertsService.dismissDefaultLoading();
          this.accessories.update((values) => {
            return [...(values as Accessory[]), res.data as Accessory];
          });

          this.navCtrl.navigateRoot('accessories');
          this.alertsService.basicAlert(
            'Éxito!',
            `Se guardado exitosamente el accesorio: ${res.data.nomAccesorio}.`,
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

  async update(accessory: Accessory) {
    await this.alertsService.presentLoading();
    this.httpClient
      .put<ApiResponse>(`${this.apiEndPoint}/update`, accessory)
      .subscribe({
        next: (res) => {
          this.alertsService.dismissDefaultLoading();
          this.accessories.update((values) => {
            const current = [...values];
            const toUpdate = current.indexOf(accessory);
            current[toUpdate] = res.data as Accessory;
            return current;
          });

          this.navCtrl.navigateRoot(['/accessories']);
          this.alertsService.basicAlert(
            'Éxito!',
            `Se guardado exitosamente el accesorio: ${res.data.nomAccesorio}.`,
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
