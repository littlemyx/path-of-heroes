import { Layout } from "~/components/Layout";
import { useBattles } from "@hooks";

import css from "./battles.module.css";

export default function Battles() {
  const { battles = [], loading, error } = useBattles();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <Layout title="ИСТОРИЯ БОЁВ">
      {/* Header */}
      <div className={css.battlesHeader}>
        <span className={css.headerIcon}>⚔️</span>
        <span className={css.headerText}>
          Всего сражений: {battles.length}
        </span>
      </div>

      {/* Loading/Error states */}
      {loading && <div className={css.loading}>Загрузка истории боёв...</div>}
      {error && <div className={css.error}>Ошибка загрузки: {error}</div>}

      {/* Battles list */}
      {!loading && !error && battles.length === 0 && (
        <div className={css.emptyState}>
          Пока не было ни одного сражения
        </div>
      )}

      {!loading && !error && battles.length > 0 && (
        <div className={css.battlesList}>
          {battles.map(battle => (
            <div key={battle.id} className={css.battleCard}>
              <div className={css.battleDate}>
                {formatDate(battle.created)}
              </div>
              
              <div className={css.battleParticipants}>
                {battle.participants.map((participantId, index) => (
                  <span key={participantId}>
                    {index > 0 && <span className={css.vs}> VS </span>}
                    <span className={css.participantName}>
                      {participantId}
                    </span>
                  </span>
                ))}
              </div>

              <div className={css.battleResult}>
                <span className={css.winnerLabel}>Победитель:</span>
                {battle.winners && battle.winners.length > 0 ? (
                  battle.winners.map(winnerId => (
                    <span key={winnerId} className={css.winnerName}>
                      {winnerId}
                    </span>
                  ))
                ) : (
                  <span className={css.noWinner}>Ничья</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

