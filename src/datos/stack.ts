export interface GrupoStack {
  id: "hoy" | "aprendiendo";
  titulo: string;
  items: string[];
}

export const stack: GrupoStack[] = [
  {
    id: "hoy",
    titulo: "Lo que uso hoy",
    items: [
      "HTML, CSS y JavaScript",
      "TypeScript",
      "React",
      "Astro",
      "Tailwind CSS",
      "Vite",
      "Java",
      "Lua y Luau",
      "Git y GitHub",
      "Docker, en lo básico",
      "Cloudflare Pages, Netlify y despliegue continuo",
      "Diseño responsive mobile-first",
      "Accesibilidad WCAG AA",
      "Optimización de imágenes y rendimiento",
    ],
  },
  {
    id: "aprendiendo",
    titulo: "Lo que estoy aprendiendo ahora",
    items: [
      "Next.js",
      "Node.js",
      "Bases de datos con Cloudflare D1 y Supabase",
      "Figma",
      "Pruebas con Vitest y Playwright",
    ],
  },
];
