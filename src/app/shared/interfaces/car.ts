import { Contract } from './contract';
import { Model } from './model';

export interface Car {
  idVehiculo: number;
  nemVehiculo: string;
  numMatricula: string;
  modelo: string;
  model: Model;
  contract: Contract;
  odometro: number;
  fuel: string;
}
