import type { Logo } from "@/lib/logos";

/** Herramientas sin logo propio: se muestran con un icono. */
export type IconoStack = "movil" | "accesibilidad" | "rendimiento";

export interface ItemStack {
  nombre: string;
  logos?: Logo[];
  icono?: IconoStack;
}

export interface GrupoStack {
  id: "hoy" | "aprendiendo";
  titulo: string;
  items: ItemStack[];
}

export const stack: GrupoStack[] = [
  {
    id: "hoy",
    titulo: "Lo que uso hoy",
    items: [
      { nombre: "HTML, CSS y JavaScript", logos: ["html5", "css", "javascript"] },
      { nombre: "TypeScript", logos: ["typescript"] },
      { nombre: "React", logos: ["react"] },
      { nombre: "Astro", logos: ["astro"] },
      { nombre: "Tailwind CSS", logos: ["tailwindcss"] },
      { nombre: "Vite", logos: ["vite"] },
      { nombre: "Java", logos: ["openjdk"] },
      { nombre: "Lua y Luau", logos: ["lua"] },
      { nombre: "Git y GitHub", logos: ["git", "github"] },
      { nombre: "Docker, en lo básico", logos: ["docker"] },
      { nombre: "Cloudflare Pages, Netlify y despliegue continuo", logos: ["cloudflarepages", "netlify"] },
      { nombre: "Diseño responsive mobile-first", icono: "movil" },
      { nombre: "Accesibilidad WCAG AA", icono: "accesibilidad" },
      { nombre: "Optimización de imágenes y rendimiento", icono: "rendimiento" },
    ],
  },
  {
    id: "aprendiendo",
    titulo: "Lo que estoy aprendiendo ahora",
    items: [
      { nombre: "Next.js", logos: ["nextdotjs"] },
      { nombre: "Node.js", logos: ["nodedotjs"] },
      { nombre: "Bases de datos con Cloudflare D1 y Supabase", logos: ["cloudflare", "supabase"] },
      { nombre: "Figma", logos: ["figma"] },
      { nombre: "Pruebas con Vitest y Playwright", logos: ["vitest"] },
    ],
  },
];
