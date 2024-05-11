import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { ApiResponse } from '../interfaces/api-response';
import { catchError, map, retry, shareReplay } from 'rxjs';
import { DamageType } from '../interfaces/damage-type';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class DamageTypesService {
  //inyecta el cliente para hacer peticiones HTTP
  private httpClient = inject(HttpClient);

  //declara el endpoint de la API para el recurso
  private apiEndPoint = `${environment.apiUrl}/damage-types`;

  //inyeccion de servicios
  private alertService = inject(AlertService);

  //declaracion de signal a partir de los datos obtenidos
  damageTypes = signal<DamageType[]>([]);
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
        const damageTypes = response.data as DamageType[];

        this.damageTypes.set(damageTypes);
        subsc.unsubscribe();
      });
  }
}
