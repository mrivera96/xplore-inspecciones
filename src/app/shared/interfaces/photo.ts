import { AutoPart } from "./auto-part";

export interface Photo {
    idInspeccion?: number;
    idPieza?: number;
    foto?: string | {};
    auto_part?: AutoPart;
    etapa?: string
  }
  