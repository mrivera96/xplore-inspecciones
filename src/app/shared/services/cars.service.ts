import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/api-response';
import { catchError, map, shareReplay } from 'rxjs';
import { Car } from '../interfaces/car';
import { toSignal } from '@angular/core/rxjs-interop';
import { AlertService } from './alert.service';

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

  //se obtienen los vehiculos de la API y se almacena en la variable _cars para su posterior uso
  private _cars = this.httpClient
    .get<ApiResponse>(`${this.apiEndPoint}/list`)
    .pipe(
      map((res) => res.data as Car[]),
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
  cars = toSignal(this._cars);
  filteredCars = toSignal(this._cars);
  currentCar = signal<Car>({} as Car);

  //método para buscar vehículo y filtrar el listado general
  searchCar(vehicleName: string) {
    this.filteredCars()?.filter((x) =>
      x.nemVehiculo.toLowerCase().includes(vehicleName.toLowerCase())
    );
  }

  setCurrentCar(car: Car) {
    this.currentCar.update(() => {
      return car;
    });
  }

  updateCurrentCar(car: Car) {}
}
