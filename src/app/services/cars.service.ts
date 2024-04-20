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
  private apiEndPoint = `${environment.apiUrl}/cars`;
  private httpClient = inject(HttpClient);
  private alertService = inject(AlertService);
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

  cars = toSignal(this._cars);
  currentCar = signal<Car | undefined>(undefined);
  filteredCars = toSignal(this._cars);

  selectCar(id: number) {
    const selectedCar = this.cars()?.find((x) => x.idVehiculo == id);
    this.currentCar.set(selectedCar);
  }

  searchCar(vehicleName: string) {
    this.filteredCars()?.filter((x) =>
      x.nemVehiculo.toLowerCase().includes(vehicleName.toLowerCase())
    );
  }
}
