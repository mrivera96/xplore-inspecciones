import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from 'src/environments/environment';
import { map, shareReplay } from 'rxjs';
import { DamagePart } from '../interfaces/damage-part';
import { toSignal } from '@angular/core/rxjs-interop';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class DamagePartsService {
  //inyecta el cliente para hacer peticiones HTTP
  private httpClient = inject(HttpClient);

  //declara el endpoint de la API para el recurso
  private apiEndPoint = `${environment.apiUrl}/damage-parts`;

  //inyeccion de servicios
  private alertService = inject(AlertService);

  //se obtienen las partes de vehiculo de la API y se almacena en la variable _damageParts para su posterior uso
  private _damageParts = this.httpClient
    .get<ApiResponse>(`${this.apiEndPoint}/list`)
    .pipe(
      map((res) => res.data as DamagePart[]),
      shareReplay(1)
    );

  //declaracion de signal a partir de los datos obtenidos
  damageParts = toSignal(this._damageParts);
  constructor() {}
}
