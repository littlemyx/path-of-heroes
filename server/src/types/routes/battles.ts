import { BattlesRecord } from "../pb-types";

export interface BattleRouteParams {
  id: string;
}

export interface GetBattlesQuery {
  page?: string;
  perPage?: string;
  expand?: string;
  participantId?: string;
  winnerId?: string;
}

export interface BattlesListResponse {
  items: BattlesRecord[];
  totalItems: number;
  totalPages?: number;
  page: number;
  perPage: number;
}

