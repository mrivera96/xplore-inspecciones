import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { Car } from '../interfaces/car';
import { ApiResponse } from '../interfaces/api-response';
import { retry, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  //inyecta el cliente para hacer peticiones HTTP
  private httpClient = inject(HttpClient);

  //declara el endpoint de la API para el recurso
  private apiEndPoint = `${environment.apiUrl}/cars`;

  //inyeccion de servicios
  private alertService = inject(AlertService);

  //declaracion de signal a partir de los datos obtenidos
  cars = signal<Car[]>([]);
  currentCar = signal<Car>({} as Car);

  constructor() {
    this.loadData();
  }

  public loadData() {
    const subsc = this.httpClient
      .get<ApiResponse>(`${this.apiEndPoint}/list`)
      .pipe(retry(3), shareReplay(1))
      .subscribe((res) => {
        this.cars.set(res.data);
        subsc.unsubscribe();
      });
  }
}
