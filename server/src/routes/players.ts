import { Router, Request, Response, NextFunction } from "express";
import { playerService } from "../services/playerService.js";

import { PlayersRecord } from "../types/pb-types";
import type {
  GetPlayersQuery,
  PlayerRouteParams,
  PlayersListResponse
} from "../types/routes/players";

const router = Router();

type EmptyParams = Record<string, never>;

type GetPlayersRequest = Request<
  EmptyParams,
  PlayersListResponse,
  undefined,
  GetPlayersQuery
>;
type GetPlayerByIdRequest = Request<PlayerRouteParams, PlayersRecord>;
type CreatePlayerRequest = Request<EmptyParams, PlayersRecord, PlayersRecord>;
type UpdatePlayerRequest = Request<
  PlayerRouteParams,
  PlayersRecord,
  PlayersRecord
>;
type DeletePlayerRequest = Request<PlayerRouteParams, void>;

/**
 * GET /api/players
 * Get all players with pagination
 */
router.get(
  "/",
  async (
    req: GetPlayersRequest,
    res: Response<PlayersListResponse>,
    next: NextFunction
  ) => {
    try {
      const page = req.query.page ? parseInt(req.query.page, 10) : 1;
      const perPage = req.query.perPage ? parseInt(req.query.perPage, 10) : 50;
      const status = req.query.status;
      const search = req.query.search;
      const expand = req.query.expand;

      // Handle status filter
      if (status) {
        const players = await playerService.getPlayersByStatus(status);
        return res.json({
          items: players,
          totalItems: players.length,
          page: 1,
          perPage: players.length
        });
      }

      // Handle search
      if (search) {
        const players = await playerService.searchPlayers(search);
        return res.json({
          items: players,
          totalItems: players.length,
          page: 1,
          perPage: players.length
        });
      }

      // Get all players with pagination
      const result = await playerService.getAllPlayers(page, perPage, expand);
      res.json({
        items: result.items,
        totalItems: result.totalItems,
        totalPages: result.totalPages,
        page,
        perPage
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/players/:id
 * Get a player by ID
 */
router.get(
  "/:id",
  async (
    req: GetPlayerByIdRequest,
    res: Response<PlayersRecord>,
    next: NextFunction
  ) => {
    try {
      const player = await playerService.getPlayerById(req.params.id);
      res.json(player);
    } catch (error) {
      res.status(404);
      next(error);
    }
  }
);

/**
 * POST /api/players
 * Create a new player
 */
router.post(
  "/",
  async (
    req: CreatePlayerRequest,
    res: Response<PlayersRecord>,
    next: NextFunction
  ) => {
    try {
      const playerData = req.body;

      // Basic validation
      if (!playerData.id) {
        res.status(400);
        throw new Error("Username and email are required");
      }

      const player = await playerService.createPlayer(playerData);
      res.status(201).json(player);
    } catch (error) {
      if (res.statusCode === 200) {
        res.status(400);
      }
      next(error);
    }
  }
);

/**
 * PATCH /api/players/:id
 * Update a player
 */
router.patch(
  "/:id",
  async (
    req: UpdatePlayerRequest,
    res: Response<PlayersRecord>,
    next: NextFunction
  ) => {
    try {
      const player = await playerService.updatePlayer(req.params.id, req.body);
      res.json(player);
    } catch (error) {
      res.status(404);
      next(error);
    }
  }
);

/**
 * DELETE /api/players/:id
 * Delete a player
 */
router.delete(
  "/:id",
  async (req: DeletePlayerRequest, res: Response<void>, next: NextFunction) => {
    try {
      await playerService.deletePlayer(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404);
      next(error);
    }
  }
);

export default router;
