import { Injectable, Signal, inject, signal } from '@angular/core';
import { Inspection } from '../interfaces/inspection';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from 'src/environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InspectionsService {
  private httpClient = inject(HttpClient);
  private apiEndPoint = `${environment.apiUrl}/inspections`;
  private _inspections = this.httpClient
    .get<ApiResponse>(`${this.apiEndPoint}/list`)
    .pipe(
      map((res) => res.data as Inspection[]),
      shareReplay(1)
    );

  inspections = toSignal(this._inspections);
  private currentInspection = signal<Inspection | undefined>(undefined);

  selectInspection(id: number) {
    const selectedInspection = this.inspections()?.find(
      (x) => x.idVehiculo == id
    );
    this.currentInspection.set(selectedInspection);
  }

  updateCurrentInspection(inspect: Inspection) {
    this.currentInspection.update((x) => inspect);
    console.log(this.currentInspection())
  }

  getCurrentInspection() {
    return this.currentInspection();
  }
}
