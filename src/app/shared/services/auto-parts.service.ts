import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from 'src/environments/environment';
import { map, retry, shareReplay } from 'rxjs';
import { AutoPart } from '../interfaces/auto-part';
import { toSignal } from '@angular/core/rxjs-interop';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AutoPartsService {
  //inyecta el cliente para hacer peticiones HTTP
  private httpClient = inject(HttpClient);

  //declara el endpoint de la API para el recurso
  private apiEndPoint = `${environment.apiUrl}/damage-parts`;

  //inyeccion de servicios
  private alertService = inject(AlertService);

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
}
