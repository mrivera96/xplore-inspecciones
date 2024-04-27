import { Accessory } from './accessory';
import { Car } from './car';
import { Contract } from './contract';
import { Damage } from './damage';

export interface Inspection {
  idInspeccion?: number;
  idVehiculo?: number;
  idContrato?: number;
  idCliente?: number;
  idAgenciaSalida?: number;
  combSalida?: string;
  odoSalida?: number;
  firmaClienteSalida?: string | {};
  idAgenciaEntrega?: number;
  combEntrega?: string;
  rendCombEntrega?: string;
  odoEntrega?: number;
  firmaClienteEntrega?: string;
  nomRecibeVehiculo?: string;
  nomEntregaVehiculo?: string;
  fotoLicencia?: string;
  daniosSalida: Damage[];
  daniosEntrega: Damage[];
  accesoriosSalida: Accessory[];
  accesoriosEntrega: Accessory[];
  state?: any;
  contract?: Contract;
  fechaSalida?: Date;
  idUsuarioSalida?: number;
  fechaEntrega?: Date;
  idUsuarioEntrega?: number;
  car?: Car;
  comentariosLlantasDelanteras?: string;
  comentariosLlantasTraseras?: string;
  comentariosBateria?: string;
  stage?: string;
  idEstado?:number
}
