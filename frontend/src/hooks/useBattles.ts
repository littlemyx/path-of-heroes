import { useEffect, useState } from "react";
import { BattlesRecord } from "~/db-types/pocketbase-types";

export interface BattlesListResponse {
  items: BattlesRecord[];
  totalPages: number;
  totalItems: number;
}

export const useBattles = () => {
  const [battles, setBattles] = useState<BattlesRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBattles = async () => {
      try {
        const response = await fetch("/api/battles?expand=participants,winners");
        if (!response.ok) {
          throw new Error("Failed to fetch battles");
        }
        const data = (await response.json()) as BattlesListResponse;

        setBattles(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchBattles();
  }, []);

  return { battles, loading, error };
};

