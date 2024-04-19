import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from 'src/environments/environment';
import { map, shareReplay } from 'rxjs';
import { DamagePart } from '../interfaces/damage-part';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class DamagePartsService {
  private apiEndPoint = `${environment.apiUrl}/damage-parts`;
  private httpClient = inject(HttpClient);
  private _damageParts = this.httpClient
    .get<ApiResponse>(`${this.apiEndPoint}/list`)
    .pipe(
      map((res) => res.data as DamagePart[]),
      shareReplay(1)
    );

  damageParts = toSignal(this._damageParts);
  constructor() {}
}
