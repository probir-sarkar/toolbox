// vite.config.ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  server: {
    port: 3000
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: "./src",
      prerender: {
        enabled: true,
        concurrency: 14,
        crawlLinks: true
      },
      sitemap: {
        enabled: true,
        host: "https://toolbox.probir.dev"
      }
    }),
    nitro(),
    viteReact()
  ]
});
