import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { ApiResponse } from '../interfaces/api-response';
import { catchError, map, shareReplay } from 'rxjs';
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

  //se obtienen los vehiculos de la API y se almacena en la variable _cars para su posterior uso
  private _accessories = this.httpClient
    .get<ApiResponse>(`${this.apiEndPoint}/list`)
    .pipe(
      map((res) => res.data as Accessory[]),
      catchError((error) => {
        this.alertService.basicAlert(
          'Error',
          'Ocurrió un error al conectarse al servidor',
          ['Ok']
        );
        return [];
      }),
      shareReplay(1)
    );

  //declaracion de signal a partir de los vehiculos
  accessories = toSignal(this._accessories);
  constructor() {}
}
