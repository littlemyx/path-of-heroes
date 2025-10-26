import { Router, Request, Response, NextFunction } from 'express';
import { playerService } from '../services/playerService.js';
import { PlayerCreate, PlayerUpdate } from '../types/player.js';

const router = Router();

/**
 * GET /api/players
 * Get all players with pagination
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 50;
    const status = req.query.status as 'online' | 'offline' | 'away' | undefined;
    const search = req.query.search as string | undefined;

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
    const result = await playerService.getAllPlayers(page, perPage);
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
});

/**
 * GET /api/players/:id
 * Get a player by ID
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const player = await playerService.getPlayerById(req.params.id);
    res.json(player);
  } catch (error) {
    res.status(404);
    next(error);
  }
});

/**
 * POST /api/players
 * Create a new player
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const playerData: PlayerCreate = req.body;

    // Basic validation
    if (!playerData.username || !playerData.email) {
      res.status(400);
      throw new Error('Username and email are required');
    }

    const player = await playerService.createPlayer(playerData);
    res.status(201).json(player);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(400);
    }
    next(error);
  }
});

/**
 * PATCH /api/players/:id
 * Update a player
 */
router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateData: PlayerUpdate = req.body;
    const player = await playerService.updatePlayer(req.params.id, updateData);
    res.json(player);
  } catch (error) {
    res.status(404);
    next(error);
  }
});

/**
 * DELETE /api/players/:id
 * Delete a player
 */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await playerService.deletePlayer(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404);
    next(error);
  }
});

export default router;
