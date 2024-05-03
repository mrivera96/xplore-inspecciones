import { AutoPart } from './auto-part';
import { DamageType } from './damage-type';

export interface Damage {
  tipoDanio?: DamageType;
  idDanio?: number;
  idInspeccion?: number;
  idPieza?: number;
  foto?: string | {};
  idTipoDanio: number;
  pieza: AutoPart;
  damage_part?: AutoPart;
  damage_type?: DamageType;
  fotos?: string;
}
