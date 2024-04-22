import { Injectable, computed, signal } from '@angular/core';
import { Damage } from '../interfaces/damage';

@Injectable({
  providedIn: 'root',
})
export class DamagesService {
  damages = signal<Damage[]>([]);

  constructor() {}

  addDamage(damage: Damage) {
    this.damages.update(values=> {
      return [...values,damage]
    })

  }
}
