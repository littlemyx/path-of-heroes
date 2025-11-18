import { useEffect, useState } from "react";
import { PlayersListResponse, PlayersRecord } from "server-types";

export interface InventoryItem {
  id: number;
  name: string;
  level: number;
  type: string;
  hit_stat: number;
  created_at: string;
  updated_at: string;
}

export interface Player {
  id: number;
  name: string;
  level: number;
  items: InventoryItem[];
  created_at: string;
  updated_at: string;
}

export const usePlayers = () => {
  const [players, setPlayers] = useState<PlayersRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/players?expand=items");
        if (!response.ok) {
          throw new Error("Failed to fetch players");
        }
        const data = (await response.json()) as PlayersListResponse;

        setPlayers(data.items);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return { players, loading, error };
};
