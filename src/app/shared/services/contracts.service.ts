import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/api-response';
import { catchError, map, retry, shareReplay } from 'rxjs';
import { Contract } from '../interfaces/contract';
import { toSignal } from '@angular/core/rxjs-interop';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})

/***********************************************************************************************
 * Servicio de contratos, se encarga de las get de los contratos hacia la API y tambien
 * se encarga de gestionar el estado global de los contratos
 * *********************************************************************************************/
export class ContractsService {
  //inyecta el cliente para hacer peticiones HTTP
  private httpClient = inject(HttpClient);

  //declara el endpoint de la API para el recurso
  private apiEndPoint = `${environment.apiUrl}/contracts`;

  //inyeccion de servicios
  private alertService = inject(AlertService);

  //declaracion de propiedades
  contracts = signal<Contract[]>([]);
  currentContract = signal<Contract>({} as Contract);

  constructor() {
    const subsc = this.httpClient
      .get<ApiResponse>(`${this.apiEndPoint}/list`)
      .pipe(
        retry(3),
        catchError((error) => {
          this.alertService.basicAlert(
            'Error',
            `Ocurrió un error al conectarse al servidor: ${error.statusText}`,
            ['Ok']
          );
          return [];
        }),
        shareReplay(1)
      )
      .subscribe((response) => {
        this.contracts.set(response.data as Contract[]);
        subsc.unsubscribe();
      });
  }

  setCurrentContract(contract: Contract) {
    this.currentContract.update(() => {
      return contract;
    });
  }

}
