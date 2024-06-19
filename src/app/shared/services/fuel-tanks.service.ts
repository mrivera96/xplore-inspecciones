import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { FuelTank } from '../interfaces/fuel-tank';
import { ApiResponse } from '../interfaces/api-response';
import { retry, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FuelTanksService {
  //inyecta el cliente para hacer peticiones HTTP
  private httpClient = inject(HttpClient);

  //declara el endpoint de la API para el recurso
  private apiEndPoint = `${environment.apiUrl}/fuel-tanks`;

  //inyeccion de servicios
  private alertService = inject(AlertService);

  //declaracion de signal a partir de los datos obtenidos
  fuelTanks = signal<FuelTank[]>([]);
  constructor() {
    this.loadData();
  }

  public loadData() {
    const subsc = this.httpClient
      .get<ApiResponse>(`${this.apiEndPoint}/list`)
      .pipe(retry(3), shareReplay(1))
      .subscribe((res) => {
        this.fuelTanks.set(res.data);
        subsc.unsubscribe();
      });
  }
}
