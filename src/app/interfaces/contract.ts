import { Customer } from './customer';

export interface Contract {
  idContrato: number;
  idCliente: number;
  idEstado: number;
  numContrato: string;
  customer: Customer;
}
