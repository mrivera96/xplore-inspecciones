import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { ApiResponse } from '../interfaces/api-response';
import { catchError, map, retry, shareReplay } from 'rxjs';
import { Accessory } from '../interfaces/accessory';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AccessoriesService {
  //inyecta el cliente para hacer peticiones HTTP
  private httpClient = inject(HttpClient);

  //declara el endpoint de la API para el recurso
  private apiEndPoint = `${environment.apiUrl}/accessories`;

  //inyeccion de servicios
  private alertService = inject(AlertService);

  //declaracion de signal a partir de los vehiculos
  accessories = signal<Accessory[]>([]);
  currentAccessories = signal<Accessory[]>([]);
  constructor() {
    const subsc = this.httpClient
      .get<ApiResponse>(`${this.apiEndPoint}/list`)
      .pipe(
        retry(3),
        catchError((error) => {
          this.alertService.basicAlert(
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
    this.currentAccessories.update((values) => {
      return [...values, accessory];
    });
  }

  removeCurrentAccessory(accessory: Accessory) {
    this.currentAccessories.update((values) => {
      return values.filter((x) => x.idAccesorio != accessory.idAccesorio);
    });
  }
}
