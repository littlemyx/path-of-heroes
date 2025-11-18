import type { PlayersRecord } from "../../types/pb-types";

export type PlayerStatusFilter = "online" | "offline" | "away";

export interface GetPlayersQuery {
  page?: string;
  perPage?: string;
  status?: PlayerStatusFilter;
  search?: string;
  expand?: string;
}

export interface PlayersListResponse {
  items: PlayersRecord[];
  totalItems: number;
  page: number;
  perPage: number;
  totalPages?: number;
}

export interface PlayerRouteParams {
  id: string;
}

export interface RouteDefinition<
  TParams = undefined,
  TQuery = undefined,
  TBody = undefined,
  TResponse = undefined
> {
  params?: TParams;
  query?: TQuery;
  body?: TBody;
  response: TResponse;
}

export interface PlayersRoutes {
  "/api/players": {
    get: RouteDefinition<
      undefined,
      GetPlayersQuery,
      undefined,
      PlayersListResponse
    >;
    post: RouteDefinition<undefined, undefined, PlayersRecord, PlayersRecord>;
  };
  "/api/players/:id": {
    get: RouteDefinition<
      PlayerRouteParams,
      undefined,
      undefined,
      PlayersRecord
    >;
    patch: RouteDefinition<
      PlayerRouteParams,
      undefined,
      PlayersRecord,
      PlayersRecord
    >;
    delete: RouteDefinition<PlayerRouteParams, undefined, undefined, void>;
  };
}
