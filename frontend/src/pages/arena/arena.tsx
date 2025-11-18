import { NineSlice } from "~/components/NineSlice";
import { Layout } from "~/components/Layout";
import { List, ListItem } from "~/components/List";
import { usePlayers } from "@hooks";
import { Player } from "./components/player";

export default function Arena() {
  const { players = [], loading, error } = usePlayers();

  return (
    <Layout title="Arena">
      <div>Header</div>
      <div>Arena</div>
      <>{loading && <div>Loading players...</div>}</>
      <>{error && <div>Error loading players: {error}</div>}</>
      <List>
        {players.map(player => (
          <ListItem key={player.id}>
            <Player data={player} />
          </ListItem>
        ))}
      </List>
    </Layout>
  );
}
