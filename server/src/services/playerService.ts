import PocketBase from "pocketbase";
import { Player, PlayerCreate, PlayerUpdate } from "../types/player.js";

const POCKETBASE_URL = process.env.POCKETBASE_URL || "http://127.0.0.1:8090";
const pb = new PocketBase(POCKETBASE_URL);

// Disable auto cancellation for better reliability
pb.autoCancellation(false);

const COLLECTION_NAME = "players";

export class PlayerService {
  /**
   * Get all players
   */
  async getAllPlayers(
    page = 1,
    perPage = 50
  ): Promise<{ items: Player[]; totalPages: number; totalItems: number }> {
    try {
      const result = await pb
        .collection(COLLECTION_NAME)
        .getList(page, perPage);

      const items = (result.items as unknown as Player[]).sort((a, b) => {
        const aCreated = new Date(a.created ?? 0).getTime();
        const bCreated = new Date(b.created ?? 0).getTime();
        return bCreated - aCreated;
      });

      return {
        items,
        totalPages: result.totalPages,
        totalItems: result.totalItems
      };
    } catch (error) {
      console.error("Error fetching players:", error);
      throw new Error("Failed to fetch players");
    }
  }

  /**
   * Get a player by ID
   */
  async getPlayerById(id: string): Promise<Player> {
    try {
      const player = await pb.collection(COLLECTION_NAME).getOne(id);
      return player as unknown as Player;
    } catch (error) {
      console.error("Error fetching player by id:", error);
      throw new Error("Player not found");
    }
  }

  /**
   * Create a new player
   */
  async createPlayer(data: PlayerCreate): Promise<Player> {
    try {
      const playerData = {
        username: data.username,
        email: data.email,
        level: data.level || 1,
        experience: data.experience || 0,
        status: data.status || "offline",
        lastSeen: new Date().toISOString()
      };

      const player = await pb.collection(COLLECTION_NAME).create(playerData);
      return player as unknown as Player;
    } catch (error) {
      console.error("Error creating player:", error);
      throw new Error("Failed to create player");
    }
  }

  /**
   * Update a player
   */
  async updatePlayer(id: string, data: PlayerUpdate): Promise<Player> {
    try {
      const updateData: any = { ...data };

      // Update lastSeen when status changes to online
      if (data.status === "online") {
        updateData.lastSeen = new Date().toISOString();
      }

      const player = await pb
        .collection(COLLECTION_NAME)
        .update(id, updateData);
      return player as unknown as Player;
    } catch (error) {
      console.error("Error updating player:", error);
      throw new Error("Failed to update player");
    }
  }

  /**
   * Delete a player
   */
  async deletePlayer(id: string): Promise<boolean> {
    try {
      await pb.collection(COLLECTION_NAME).delete(id);
      return true;
    } catch (error) {
      console.error("Error deleting player:", error);
      throw new Error("Failed to delete player");
    }
  }

  /**
   * Get players by status
   */
  async getPlayersByStatus(
    status: "online" | "offline" | "away"
  ): Promise<Player[]> {
    try {
      // Validate status to prevent injection
      const validStatuses = ["online", "offline", "away"];
      if (!validStatuses.includes(status)) {
        throw new Error("Invalid status value");
      }

      const result = await pb.collection(COLLECTION_NAME).getFullList({
        filter: `status = "${status}"`
      });

      return (result as unknown as Player[]).sort((a, b) => {
        const aLastSeen = new Date(a.lastSeen ?? 0).getTime();
        const bLastSeen = new Date(b.lastSeen ?? 0).getTime();
        return bLastSeen - aLastSeen;
      });
    } catch (error) {
      console.error("Error fetching players with status:", status);
      throw new Error("Failed to fetch players by status");
    }
  }

  /**
   * Search players by username
   */
  async searchPlayers(query: string): Promise<Player[]> {
    try {
      // Sanitize query to prevent injection - escape quotes
      const sanitizedQuery = query.replace(/["'\\]/g, "\\$&");

      const result = await pb.collection(COLLECTION_NAME).getFullList({
        filter: `username ~ "${sanitizedQuery}"`
      });

      return (result as unknown as Player[]).sort((a, b) => {
        const aCreated = new Date(a.created ?? 0).getTime();
        const bCreated = new Date(b.created ?? 0).getTime();
        return bCreated - aCreated;
      });
    } catch (error) {
      console.error("Error searching players");
      throw new Error("Failed to search players");
    }
  }
}

export const playerService = new PlayerService();
