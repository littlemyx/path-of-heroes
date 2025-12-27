import { PlayersRecord } from "server-types";

import css from "./player.module.css";

interface PlayerProps {
  data: PlayersRecord;
  isCurrentPlayer?: boolean;
}

export const Player = ({ data, isCurrentPlayer = false }: PlayerProps) => {
  return (
    <div className={`${css.playerRow} ${isCurrentPlayer ? css.isCurrentPlayer : ''}`}>
      {/* Avatar placeholder */}
      <div className={css.avatar}>
        <span>AVA</span>
      </div>

      {/* Player info */}
      <div className={css.playerInfo}>
        <div className={css.playerName}>{data.name}</div>
        <div className={css.playerLevel}>Ур. {data.level}</div>
      </div>

      {/* Status icons and attack button - only for non-current players */}
      {!isCurrentPlayer && (
        <>
          <div className={css.statusIcons}>
            <div className={css.statusIcon} title="Бой">⚔</div>
            <div className={css.statusIcon} title="Защита">🛡</div>
          </div>

          <button className={css.attackButton}>
            АТАКОВАТЬ
          </button>
        </>
      )}
    </div>
  );
};
