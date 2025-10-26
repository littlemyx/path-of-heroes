import { defineConfig } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  root: "frontend",
  server: {
    hmr: {
      port: Number(process.env.PORT_HMR) || undefined,
    },
  },
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: path.resolve(__dirname, "frontend/src"),
      },
    ],
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: path.resolve(__dirname, "frontend/index.html"),
    },
    outDir: "../.stormkit/public",
  },
  plugins: [react()],
});
