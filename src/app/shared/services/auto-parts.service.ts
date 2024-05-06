import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { retry, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/api-response';
import { AutoPart } from '../interfaces/auto-part';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AutoPartsService {
  //inyecta el cliente para hacer peticiones HTTP
  private httpClient = inject(HttpClient);

  //declara el endpoint de la API para el recurso
  private apiEndPoint = `${environment.apiUrl}/auto-parts`;

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