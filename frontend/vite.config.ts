//import { defineConfig } from "vite";
import { defineConfig } from 'vitest/config'
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/locales/*"],
  server: {
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      port: 5173,
    },
  },
    test: {
    environment: 'jsdom',
  },
});
