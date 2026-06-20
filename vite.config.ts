// vite.config.ts
import { defineConfig } from "vite-plus";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { playwright } from "vite-plus/test/browser-playwright";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    trailingComma: "es5",
    printWidth: 120,
    tabWidth: 2,
  },
  lint: {
    ignorePatterns: ["dist/**", "node_modules/**"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
  test: {
    browser: {
      provider: playwright(),
      enabled: true,
      headless: true,
      instances: [{ browser: "chromium" }],
    },
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    tanstackStart({
      srcDirectory: "./src",
      prerender: {
        enabled: true,
        concurrency: 14,
        crawlLinks: true,
      },
      sitemap: {
        enabled: true,
        host: "https://toolbox.probir.dev",
      },
    }),
    viteReact(),
  ],
});
