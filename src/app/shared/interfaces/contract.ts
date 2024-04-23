import { Customer } from './customer';

export interface Contract {
  fechaSalida: Date | undefined;
  idAgenciaSalida: number | undefined;
  idContrato: number;
  idCliente: number;
  idEstado: number;
  numContrato: string;
  customer: Customer;
}
