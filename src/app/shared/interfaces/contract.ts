import { Agency } from './agency';
import { Car } from './car';
import { Customer } from './customer';

export interface Contract {
  fechaSalida: Date | undefined;
  idAgenciaSalida: number | undefined;
  idContrato: number;
  idCliente: number;
  idVehiculo: number;
  idEstado: number;
  numContrato: string;
  customer: Customer;
  car?: Car;
  check_out_agency: Agency
}
