import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { ApiResponse } from '../interfaces/api-response';
import { map, shareReplay } from 'rxjs';
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

  //se obtienen las partes de vehiculo de la API y se almacena en la variable _damageParts para su posterior uso
  private _damageTypes = this.httpClient
    .get<ApiResponse>(`${this.apiEndPoint}/list`)
    .pipe(
      map((res) => res.data as DamageType[]),
      shareReplay(1)
    );

  //declaracion de signal a partir de los datos obtenidos
  damageTypes = toSignal(this._damageTypes);
  constructor() {}
}
