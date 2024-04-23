import { Accessory } from './accessory';
import { Car } from './car';
import { Damage } from './damage';

export interface Inspection {
  idInspeccion?: number;
  idVehiculo?: number;
  idContrato?: number;
  idCliente?: number;
  idAgenciaSalida?: number;
  combSalida?: string;
  odoSalida?: number;
  firmaClienteSalida?: string;
  idAgenciaEntrega?: number;
  combEntrega?: string;
  rendCombEntrega?: string;
  odoEntrega?: number;
  firmaClienteEntrega?: string;
  nomRecibeVehiculo?: string;
  nomEntregaVehiculo?: string;
  fotoLicencia: string;
  danios: Damage[];
  accesorios: Accessory[];
  state?: any;
  car?: Car;
  fechaSalida?: Date;
  idUsuarioSalida?: number;
  fechaEntrega?: Date;
  idUsuarioEntrega?: number;
}
