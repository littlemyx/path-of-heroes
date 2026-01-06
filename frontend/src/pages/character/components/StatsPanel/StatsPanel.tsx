import { PlayersRecord } from "server-types";

import css from "./StatsPanel.module.css";

interface StatsPanelProps {
  player: PlayersRecord;
}

// Mock stats for now - will be replaced with real data
const mockStats = {
  health: 8775,
  maxHealth: 10000,
  strength: 550,
  dexterity: 40,
  experience: 1500,
  maxExperience: 2000,
  agility: 35,
  defense: 1500,
  maxDefense: 2000,
};

export const StatsPanel = ({ player }: StatsPanelProps) => {
  return (
    <div className={css.statsPanel}>
      {/* Avatar */}
      <div className={css.avatarSection}>
        <div className={css.avatarFrame}>
          <div className={css.avatarPlaceholder}>
            <span className={css.avatarIcon}>⚔️</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={css.statsGrid}>
        <div className={css.statsColumn}>
          <div className={css.statRow}>
            <span className={css.statLabel}>Уровень:</span>
            <span className={css.statValue}>{player.level || 1}</span>
          </div>
          <div className={css.statRow}>
            <span className={css.statLabel}>Здоровье:</span>
            <span className={css.statValue}>{mockStats.health}</span>
          </div>
          <div className={css.statRow}>
            <span className={css.statLabel}>Сила:</span>
            <span className={css.statValue}>{mockStats.strength}</span>
          </div>
          <div className={css.statRow}>
            <span className={css.statLabel}>Ловкость:</span>
            <span className={css.statValue}>{mockStats.dexterity}</span>
          </div>
          <div className={css.statRow}>
            <span className={css.statLabel}>Опыт:</span>
            <span className={css.statValue}>
              {mockStats.experience}/{mockStats.maxExperience}
            </span>
          </div>
        </div>

        <div className={css.statsColumn}>
          <div className={css.statRow}>
            <span className={css.statLabel}>&nbsp;</span>
            <span className={css.statValue}>{player.level || 1}</span>
          </div>
          <div className={css.statRow}>
            <span className={css.statLabel}>Здоровье:</span>
            <span className={css.statValue}>5/0</span>
          </div>
          <div className={css.statRow}>
            <span className={css.statLabel}>Ловкость:</span>
            <span className={css.statValue}>3/5</span>
          </div>
          <div className={css.statRow}>
            <span className={css.statLabel}>Защита:</span>
            <span className={css.statValue}>&nbsp;</span>
          </div>
          <div className={css.statRow}>
            <span className={css.statLabel}>&nbsp;</span>
            <span className={css.statValue}>
              {mockStats.defense}/{mockStats.maxDefense}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

