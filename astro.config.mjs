import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://santofimiodev.pages.dev",
  // Español en la raíz y el inglés en /en/.
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: "es", locales: { es: "es-CO", en: "en" } },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
