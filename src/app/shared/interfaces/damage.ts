import { DamagePart } from './damage-part';
import { DamageType } from './damage-type';

export interface Damage {
  tipoDanio?: DamageType;
  idDanio?: number;
  idInspeccion?: number;
  idPieza?: number;
  foto?: string | {};
  idTipoDanio: number;
  pieza: DamagePart;
}
