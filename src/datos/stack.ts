import type { Logo } from "@/lib/logos";

export interface ItemStack {
  nombre: string;
  logos: Logo[];
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
