import { PlayersListResponse, PlayersRecord } from "server-types";

import css from "./player.module.css";

interface PlayerProps {
  data: PlayersRecord;
}

export const Player = ({ data }: PlayerProps) => {
  return (
    <div>
      <div>Face</div>
      <div className={css.playerInfo}>
        <div>{data.name}</div>
        <div>Level {data.level}</div>
      </div>
      <div>
        {data.items.map(item => (
          <div key={item.id}>
            {item.name} (Level {item.level})
          </div>
        ))}
      </div>
    </div>
  );
};
