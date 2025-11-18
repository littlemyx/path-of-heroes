import { defineConfig } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: {
      port: Number(process.env.PORT_HMR) || undefined
    }
  },
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: path.resolve(__dirname, "src")
      },
      {
        find: "@uikit",
        replacement: path.resolve(__dirname, "src/uikit")
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "src/hooks")
      }
    ],
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"]
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: "index.html"
    },
    outDir: ".stormkit/public"
  },
  plugins: [react()]
});
