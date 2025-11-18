import PocketBase from "pocketbase";
import {
  PlayersRecord,
  PlayersResponse,
  ItemsResponse
} from "../types/pb-types";

const POCKETBASE_URL = process.env.POCKETBASE_URL || "http://127.0.0.1:8090";
const pb = new PocketBase(POCKETBASE_URL);

// Disable auto cancellation for better reliability
pb.autoCancellation(false);

const COLLECTION_NAME = "players";

export interface PlayersRecordWithItems {
  items: PlayersRecord[];
  totalPages: number;
  totalItems: number;
}

export class PlayerService {
  private mergeExpandedRelations<
    ExpandName extends keyof PlayersRecord,
    ExpandType
  >(
    expandKey: ExpandName,
    record: PlayersResponse<Record<ExpandName, ExpandType>>
  ): PlayersResponse<Record<ExpandName, ExpandType>> {
    const normalizedRecord = { ...record } as PlayersResponse<
      Record<ExpandName, ExpandType>
    >;
    const expandMap = record.expand as
      | Record<ExpandName, ExpandType>
      | undefined;
    const expanded = expandMap?.[expandKey];

    if (expanded !== undefined) {
      (normalizedRecord as Record<ExpandName, ExpandType>)[expandKey] =
        expanded;
    }
    // if (expandedValue !== undefined) {
    //   normalizedRecord[expandKey] = expandedValue;
    // }

    return normalizedRecord;
  }

  /**
   * Get all players
   */
  async getAllPlayers(
    page = 1,
    perPage = 50,
    expand?: string
  ): Promise<PlayersRecordWithItems> {
    try {
      const queryParams = expand ? { expand } : undefined;
      console.log("Query params:", queryParams);
      const result = await pb
        .collection(COLLECTION_NAME)
        .getList<PlayersResponse<Record<"items", ItemsResponse>>>(
          page,
          perPage,
          {
            expand: "items"
          }
        );

      console.log("Fetched players:", result.items[0].items);

      const normalizedItems = result.items.map(record =>
        this.mergeExpandedRelations<"items", ItemsResponse>("items", record)
      );

      const items = (normalizedItems as unknown as PlayersRecord[]).sort(
        (a, b) => {
          const aCreated = new Date(a.created ?? 0).getTime();
          const bCreated = new Date(b.created ?? 0).getTime();
          return bCreated - aCreated;
        }
      );

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
  async getPlayerById(id: string): Promise<PlayersRecord> {
    try {
      const player = await pb.collection(COLLECTION_NAME).getOne(id);
      return player as unknown as PlayersRecord;
    } catch (error) {
      console.error("Error fetching player by id:", error);
      throw new Error("Player not found");
    }
  }

  /**
   * Create a new player
   */
  async createPlayer(data: PlayersRecord): Promise<PlayersRecord> {
    try {
      const player = await pb.collection(COLLECTION_NAME).create(data);
      return player as unknown as PlayersRecord;
    } catch (error) {
      console.error("Error creating player:", error);
      throw new Error("Failed to create player");
    }
  }

  /**
   * Update a player
   */
  async updatePlayer(id: string, data: PlayersRecord): Promise<PlayersRecord> {
    try {
      const player = await pb.collection(COLLECTION_NAME).update(id, data);
      return player as unknown as PlayersRecord;
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
  ): Promise<PlayersRecord[]> {
    try {
      // Validate status to prevent injection
      const validStatuses = ["online", "offline", "away"];
      if (!validStatuses.includes(status)) {
        throw new Error("Invalid status value");
      }

      const result = await pb.collection(COLLECTION_NAME).getFullList({
        filter: `status = "${status}"`
      });

      return (result as unknown as PlayersRecord[]).sort((a, b) => {
        const aLastSeen = new Date(a.updated ?? 0).getTime();
        const bLastSeen = new Date(b.updated ?? 0).getTime();
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
  async searchPlayers(query: string): Promise<PlayersRecord[]> {
    try {
      // Sanitize query to prevent injection - escape quotes
      const sanitizedQuery = query.replace(/["'\\]/g, "\\$&");

      const result = await pb
        .collection(COLLECTION_NAME)
        .getFullList<PlayersResponse<Record<"items", ItemsResponse>>>({
          filter: `username ~ "${sanitizedQuery}"`,
          expand: "items"
        });

      const normalizedItems = result.map(record =>
        this.mergeExpandedRelations<"items", ItemsResponse>("items", record)
      );

      return (normalizedItems as unknown as PlayersRecord[]).sort((a, b) => {
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
