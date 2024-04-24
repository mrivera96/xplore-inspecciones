import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/api-response';
import { catchError, map, shareReplay } from 'rxjs';
import { Contract } from '../interfaces/contract';
import { toSignal } from '@angular/core/rxjs-interop';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  //inyecta el cliente para hacer peticiones HTTP
  private httpClient = inject(HttpClient);

  //declara el endpoint de la API para el recurso
  private apiEndPoint = `${environment.apiUrl}/contracts`;

  //inyeccion de servicios
  private alertService = inject(AlertService);

  //se obtienen los vehiculos de la API y se almacena en la variable _contracts para su posterior uso
  private _contracts = this.httpClient
    .get<ApiResponse>(`${this.apiEndPoint}/list`)
    .pipe(
      map((res) => res.data as Contract[]),
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
  contracts = toSignal(this._contracts);
  filteredContracts = toSignal(this._contracts);
  currentContract = signal<Contract>({} as Contract);

  //método para buscar vehículo y filtrar el listado general
  searchContract(vehicleName: string) {
    this.filteredContracts()?.filter((x) =>
      x.car?.nemVehiculo.toLowerCase().includes(vehicleName.toLowerCase())
    );
  }

  setCurrentContract(car: Contract) {
    this.currentContract.update(() => {
      return car;
    });
  }

  updateCurrentContract(car: Contract) {}
}
