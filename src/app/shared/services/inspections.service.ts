import { Injectable, Signal, inject, signal } from '@angular/core';
import { Inspection } from '../interfaces/inspection';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from 'src/environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, shareReplay } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class InspectionsService {
  //inyecta el cliente para hacer peticiones HTTP
  private httpClient = inject(HttpClient);

  //declara el endpoint de la API para el recurso
  private apiEndPoint = `${environment.apiUrl}/inspections`;

  //inyeccion de servicios
  alertsService = inject(AlertService);

  //declaracion de propiedades
  private _inspections = this.httpClient
    .get<ApiResponse>(`${this.apiEndPoint}/list`)
    .pipe(
      map((res) => res.data as Inspection[]),
      catchError((error) => {
        this.alertsService.basicAlert(
          'Error',
          `Ocurrió un error al conectarse al servidor: ${error.statusText}`,
          ['Ok']
        );
        return [];
      }),
      shareReplay(1)
    );

  inspections = toSignal(this._inspections);
  currentInspection = signal<Inspection | undefined>(undefined);

  selectInspection(id: number) {
    const selectedInspection = this.inspections()?.find(
      (x) => x.idVehiculo == id
    );
    this.currentInspection.set(selectedInspection);
  }

  updateCurrentInspection(inspect: Inspection) {
    this.currentInspection.update((x) => inspect);
  }

  createInspection() {
    this.httpClient
      .post<ApiResponse>(`${this.apiEndPoint}/add`, this.currentInspection())
      .pipe(
        map((res) => res.data as Inspection[]),
        catchError((error) => {
          this.alertsService.basicAlert(
            'Error',
            `Ocurrió un error al conectarse al servidor: ${error.statusText}`,
            ['Ok']
          );
          return [];
        }),
        shareReplay(1)
      );
  }
}
