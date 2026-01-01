import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifest: {
        name: "PDF to Image Converter",
        short_name: "PDF to Image",
        description:
          "⚡ Offline-first PDF to Image Converter. 100% client-side, secure, and open source.",
        theme_color: "#3b82f6",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
