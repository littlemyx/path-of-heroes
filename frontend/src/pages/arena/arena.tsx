import { Layout } from "~/components/Layout";
import { usePlayers } from "@hooks";
import { Player } from "./components/player";

import css from "./arena.module.css";

export default function Arena() {
  const { players = [], loading, error } = usePlayers();

  // First player is current player, rest are opponents
  const currentPlayer = players[0];
  const opponents = players.slice(1);

  return (
    <Layout title="АРЕНА СРАЖЕНИЙ">
      {/* Castle illustration area */}
      <div className={css.arenaHeader}>
        <div className={css.castlePlaceholder}>
          🏰
          <br />
          Castle Illustration
        </div>
      </div>

      {/* Loading/Error states */}
      {loading && <div className={css.loading}>Загрузка игроков...</div>}
      {error && <div className={css.error}>Ошибка загрузки: {error}</div>}

      {/* Players list */}
      {!loading && !error && (
        <div className={css.playersList}>
          {/* Current player */}
          {currentPlayer && (
            <div className={css.currentPlayer}>
              <Player data={currentPlayer} isCurrentPlayer />
            </div>
          )}

          {/* Opponents */}
          {opponents.map(player => (
            <Player key={player.id} data={player} />
          ))}
        </div>
      )}
    </Layout>
  );
}
