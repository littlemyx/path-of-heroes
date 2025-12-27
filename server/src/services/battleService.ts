import PocketBase from "pocketbase";
import {
  BattlesRecord,
  BattlesResponse,
  PlayersResponse
} from "../types/pb-types";

const POCKETBASE_URL = process.env.POCKETBASE_URL || "http://127.0.0.1:8090";
const pb = new PocketBase(POCKETBASE_URL);

// Disable auto cancellation for better reliability
pb.autoCancellation(false);

const COLLECTION_NAME = "battles";

export interface BattlesListResult {
  items: BattlesRecord[];
  totalPages: number;
  totalItems: number;
}

export class BattleService {
  private mergeExpandedRelations<
    ExpandName extends keyof BattlesRecord,
    ExpandType
  >(
    expandKey: ExpandName,
    record: BattlesResponse<Record<ExpandName, ExpandType>>
  ): BattlesResponse<Record<ExpandName, ExpandType>> {
    const normalizedRecord = { ...record } as BattlesResponse<
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

    return normalizedRecord;
  }

  /**
   * Get all battles with optional pagination and expansion
   */
  async getAllBattles(
    page = 1,
    perPage = 50,
    expand?: string
  ): Promise<BattlesListResult> {
    try {
      const options: { expand?: string } = {};
      if (expand) {
        options.expand = expand;
      }

      const result = await pb
        .collection(COLLECTION_NAME)
        .getList<
          BattlesResponse<Record<"participants" | "winners", PlayersResponse[]>>
        >(page, perPage, options);

      console.log("Fetched battles:", result.items.length);

      const items = (result.items as unknown as BattlesRecord[]).sort(
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
      console.error("Error fetching battles:", error);
      throw new Error("Failed to fetch battles");
    }
  }

  /**
   * Get a battle by ID
   */
  async getBattleById(id: string, expand?: string): Promise<BattlesRecord> {
    try {
      const options: { expand?: string } = {};
      if (expand) {
        options.expand = expand;
      }

      const battle = await pb.collection(COLLECTION_NAME).getOne(id, options);
      return battle as unknown as BattlesRecord;
    } catch (error) {
      console.error("Error fetching battle by id:", error);
      throw new Error("Battle not found");
    }
  }

  /**
   * Create a new battle
   */
  async createBattle(data: Partial<BattlesRecord>): Promise<BattlesRecord> {
    try {
      const battle = await pb.collection(COLLECTION_NAME).create(data);
      return battle as unknown as BattlesRecord;
    } catch (error) {
      console.error("Error creating battle:", error);
      throw new Error("Failed to create battle");
    }
  }

  /**
   * Update a battle (e.g., set winners, update battle_log)
   */
  async updateBattle(
    id: string,
    data: Partial<BattlesRecord>
  ): Promise<BattlesRecord> {
    try {
      const battle = await pb.collection(COLLECTION_NAME).update(id, data);
      return battle as unknown as BattlesRecord;
    } catch (error) {
      console.error("Error updating battle:", error);
      throw new Error("Failed to update battle");
    }
  }

  /**
   * Delete a battle
   */
  async deleteBattle(id: string): Promise<boolean> {
    try {
      await pb.collection(COLLECTION_NAME).delete(id);
      return true;
    } catch (error) {
      console.error("Error deleting battle:", error);
      throw new Error("Failed to delete battle");
    }
  }

  /**
   * Get battles by participant ID
   */
  async getBattlesByParticipant(playerId: string): Promise<BattlesRecord[]> {
    try {
      const result = await pb.collection(COLLECTION_NAME).getFullList({
        filter: `participants ~ "${playerId}"`,
        expand: "participants,winners"
      });

      return (result as unknown as BattlesRecord[]).sort((a, b) => {
        const aCreated = new Date(a.created ?? 0).getTime();
        const bCreated = new Date(b.created ?? 0).getTime();
        return bCreated - aCreated;
      });
    } catch (error) {
      console.error("Error fetching battles for participant:", playerId);
      throw new Error("Failed to fetch battles by participant");
    }
  }

  /**
   * Get battles where a specific player won
   */
  async getBattlesByWinner(playerId: string): Promise<BattlesRecord[]> {
    try {
      const result = await pb.collection(COLLECTION_NAME).getFullList({
        filter: `winners ~ "${playerId}"`,
        expand: "participants,winners"
      });

      return (result as unknown as BattlesRecord[]).sort((a, b) => {
        const aCreated = new Date(a.created ?? 0).getTime();
        const bCreated = new Date(b.created ?? 0).getTime();
        return bCreated - aCreated;
      });
    } catch (error) {
      console.error("Error fetching battles won by:", playerId);
      throw new Error("Failed to fetch battles by winner");
    }
  }
}

export const battleService = new BattleService();
