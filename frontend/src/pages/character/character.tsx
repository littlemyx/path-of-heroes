import { Layout } from "~/components/Layout";
import { usePlayers } from "@hooks";

import { StatsPanel } from "./components/StatsPanel";
import { EquipmentPanel } from "./components/EquipmentPanel";
import { InventoryPanel } from "./components/InventoryPanel";
import { SkillsPanel } from "./components/SkillsPanel";

import css from "./character.module.css";

export default function Character() {
  const { players = [], loading, error } = usePlayers();
  
  // First player is current player
  const currentPlayer = players[0];

  if (loading) {
    return (
      <Layout title="ПЕРСОНАЖ">
        <div className={css.loading}>Загрузка персонажа...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="ПЕРСОНАЖ">
        <div className={css.error}>Ошибка: {error}</div>
      </Layout>
    );
  }

  if (!currentPlayer) {
    return (
      <Layout title="ПЕРСОНАЖ">
        <div className={css.error}>Персонаж не найден</div>
      </Layout>
    );
  }

  return (
    <Layout title="ПЕРСОНАЖ">
      <div className={css.container}>
        {/* Stats section - avatar and player stats */}
        <StatsPanel player={currentPlayer} />

        {/* Equipment and Inventory row */}
        <div className={css.middleSection}>
          <EquipmentPanel />
          <InventoryPanel />
        </div>

        {/* Skills section */}
        <SkillsPanel />
      </div>
    </Layout>
  );
}

