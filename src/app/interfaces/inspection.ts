import { Car } from "./car";

export interface Inspection {
  idInspeccion?: number;
  idVehiculo?: number;
  state?: any
  car?: Car
}
