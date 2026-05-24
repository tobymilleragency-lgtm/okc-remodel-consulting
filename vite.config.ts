import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import jerikoDebug from "./vite-plugin-jeriko-debug";

// Bona fide production builds must never include Jeriko debug collector artifacts.
const enableJerikoDebug = process.env.VITE_ENABLE_JERIKO_DEBUG === "1";

export default defineConfig({
  plugins: [react(), tailwindcss(), ...(enableJerikoDebug ? [jerikoDebug()] : [])],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: true,
  },
});
