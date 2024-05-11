import { AutoPart } from './auto-part';
import { DamageType } from './damage-type';
import { Photo } from './photo';

export interface Damage {
  idDanio?: number;
  idInspeccion?: number;
  idPieza?: number;
  idTipoDanio: number;
  damage_part?: AutoPart;
  damage_type?: DamageType;
  photo?: Photo;
  etapa?: string;
}
