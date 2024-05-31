import { Photo } from './photo';
import { Accessory } from './accessory';
import { Car } from './car';
import { Contract } from './contract';
import { Damage } from './damage';
import { User } from './user';
import { FuelTank } from './fuel-tank';

export interface Inspection {
  idInspeccion?: number;
  idVehiculo?: number;
  idContrato?: number;
  idCliente?: number;
  idAgenciaSalida?: number;
  combSalida?: number;
  odoSalida?: number;
  firmaClienteSalida?: string | {};
  idAgenciaEntrega?: number;
  combEntrega?: number;
  rendCombEntrega?: string;
  odoEntrega?: number;
  firmaClienteEntrega?: string;
  nomRecibeVehiculo?: string;
  nomEntregaVehiculo?: string;
  fotoLicencia?: string;
  damages: Damage[];
  accesoriosSalida: Accessory[];
  accesoriosEntrega: Accessory[];
  state?: { idEstado?: number; descEstado?: string };
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
  idEstado?: number;
  checkout_accessories?: any[];
  checkin_accessories?: any[];
  checkout_agent?: User;
  checkin_agent?: User;
  photos?: Photo[];
  check_out_fuel?: FuelTank;
  check_in_fuel?: FuelTank;
  correoCliente?: string;
  correoConductor?: string;
  numInspeccion?: string
  created_at?:string
}
