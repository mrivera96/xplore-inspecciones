import { AutoPart } from './auto-part';
import { Damage } from './damage';

export interface Photo {
  idInspeccion?: number;
  idPieza?: number;
  foto?: string;
  auto_part?: AutoPart;
  damage?: Damage;
  etapa?: string;
}
