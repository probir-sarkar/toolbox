// vite.config.ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [
    tanstackStart({
      srcDirectory: "./",
      router: {
        routesDirectory: "routes"
      }
    }),
    viteReact(),
    tsconfigPaths({
      projects: ["./tsconfig.json"]
    }),
    tailwindcss()
  ]
});
