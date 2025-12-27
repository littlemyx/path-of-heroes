import { Router, Request, Response, NextFunction } from "express";
import { battleService } from "../services/battleService.js";

import { BattlesRecord } from "../types/pb-types";
import type {
  GetBattlesQuery,
  BattleRouteParams,
  BattlesListResponse
} from "../types/routes/battles";

const router = Router();

type EmptyParams = Record<string, never>;

type GetBattlesRequest = Request<
  EmptyParams,
  BattlesListResponse,
  undefined,
  GetBattlesQuery
>;
type GetBattleByIdRequest = Request<BattleRouteParams, BattlesRecord>;
type CreateBattleRequest = Request<EmptyParams, BattlesRecord, Partial<BattlesRecord>>;
type UpdateBattleRequest = Request<
  BattleRouteParams,
  BattlesRecord,
  Partial<BattlesRecord>
>;
type DeleteBattleRequest = Request<BattleRouteParams, void>;

/**
 * GET /api/battles
 * Get all battles with pagination
 */
router.get(
  "/",
  async (
    req: GetBattlesRequest,
    res: Response<BattlesListResponse>,
    next: NextFunction
  ) => {
    try {
      const page = req.query.page ? parseInt(req.query.page, 10) : 1;
      const perPage = req.query.perPage ? parseInt(req.query.perPage, 10) : 50;
      const expand = req.query.expand;
      const participantId = req.query.participantId;
      const winnerId = req.query.winnerId;

      // Handle participant filter
      if (participantId) {
        const battles = await battleService.getBattlesByParticipant(participantId);
        return res.json({
          items: battles,
          totalItems: battles.length,
          page: 1,
          perPage: battles.length
        });
      }

      // Handle winner filter
      if (winnerId) {
        const battles = await battleService.getBattlesByWinner(winnerId);
        return res.json({
          items: battles,
          totalItems: battles.length,
          page: 1,
          perPage: battles.length
        });
      }

      // Get all battles with pagination
      const result = await battleService.getAllBattles(page, perPage, expand);
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
 * GET /api/battles/:id
 * Get a battle by ID
 */
router.get(
  "/:id",
  async (
    req: GetBattleByIdRequest,
    res: Response<BattlesRecord>,
    next: NextFunction
  ) => {
    try {
      const expand = req.query.expand as string | undefined;
      const battle = await battleService.getBattleById(req.params.id, expand);
      res.json(battle);
    } catch (error) {
      res.status(404);
      next(error);
    }
  }
);

/**
 * POST /api/battles
 * Create a new battle
 */
router.post(
  "/",
  async (
    req: CreateBattleRequest,
    res: Response<BattlesRecord>,
    next: NextFunction
  ) => {
    try {
      const battleData = req.body;

      // Basic validation
      if (!battleData.participants || battleData.participants.length < 2) {
        res.status(400);
        throw new Error("At least 2 participants are required");
      }

      const battle = await battleService.createBattle(battleData);
      res.status(201).json(battle);
    } catch (error) {
      if (res.statusCode === 200) {
        res.status(400);
      }
      next(error);
    }
  }
);

/**
 * PATCH /api/battles/:id
 * Update a battle
 */
router.patch(
  "/:id",
  async (
    req: UpdateBattleRequest,
    res: Response<BattlesRecord>,
    next: NextFunction
  ) => {
    try {
      const battle = await battleService.updateBattle(req.params.id, req.body);
      res.json(battle);
    } catch (error) {
      res.status(404);
      next(error);
    }
  }
);

/**
 * DELETE /api/battles/:id
 * Delete a battle
 */
router.delete(
  "/:id",
  async (req: DeleteBattleRequest, res: Response<void>, next: NextFunction) => {
    try {
      await battleService.deleteBattle(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404);
      next(error);
    }
  }
);

export default router;

