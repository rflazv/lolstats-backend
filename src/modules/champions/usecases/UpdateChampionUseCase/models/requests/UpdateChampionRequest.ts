import { IChampion } from "@infrastructure/database/mongoose/models/Champion";

export interface UpdateChampionRequest {
  id: string;
  data: Partial<IChampion>;
}
