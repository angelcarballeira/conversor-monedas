import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "Conversor de Monedas",
        short_name: "Conversor",
        description: "Conversor de monedas simple y rápido",
        theme_color: "#059669",
        background_color: "#f0fdf4",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.frankfurter\.dev\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "exchange-rates-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60, // 1 hora
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});