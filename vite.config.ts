import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          const p = id.replace(/\\/g, "/");
          if (!p.includes("node_modules/")) return;
          if (/node_modules\/(react|react-dom|scheduler|react-router|react-router-dom|@remix-run|@babel)/.test(p)) {
            return "vendor-react";
          }
          if (/node_modules\/(@radix-ui|cmdk)/.test(p)) {
            return "vendor-radix";
          }
          if (/node_modules\/(recharts|victory-vendor|d3-|internmap|decimal.js-light|eventemitter3)/.test(p)) {
            return "vendor-charts";
          }
          if (/node_modules\/@supabase\//.test(p)) {
            return "vendor-supabase";
          }
          if (/node_modules\/@tanstack\//.test(p)) {
            return "vendor-query";
          }
          if (/node_modules\/(react-hook-form|@hookform|zod)/.test(p)) {
            return "vendor-forms";
          }
          if (/node_modules\/lucide-react/.test(p)) {
            return "vendor-icons";
          }
        },
      },
    },
  },
}));
