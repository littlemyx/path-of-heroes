import { Layout } from "~/components/Layout";
import { NineSlice } from "~/components/NineSlice";

export default function Home() {
  return (
    <Layout>
      <div className="App">
        <h2>9-Slice Component Demo</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem" }}>
          <NineSlice width="300px" height="200px">
            <div>Small Box (300x200)</div>
          </NineSlice>
          
          <NineSlice width="500px" height="300px">
            <div>Medium Box (500x300)</div>
          </NineSlice>
          
          <NineSlice width="700px" height="150px">
            <div>Wide Box (700x150)</div>
          </NineSlice>
        </div>
      </div>
    </Layout>
  );
}
