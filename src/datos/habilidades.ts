import type { Logo } from "@/lib/logos";

export interface Habilidad {
  id: "frontend" | "backend" | "calidad" | "despliegue";
  titulo: string;
  detalle: string;
  logos: Logo[];
}

export const habilidades: Habilidad[] = [
  {
    id: "frontend",
    titulo: "Frontend",
    detalle:
      "Interfaces con Astro, React y TypeScript, estilos con Tailwind CSS. Componentes que se usan con teclado y se adaptan a cualquier pantalla.",
    logos: ["astro", "react", "typescript", "tailwindcss"],
  },
  {
    id: "backend",
    titulo: "Backend",
    detalle: "APIs REST con Java y Spring Boot, con la lógica separada de la interfaz.",
    logos: ["openjdk", "springboot", "apachemaven"],
  },
  {
    id: "calidad",
    titulo: "Accesibilidad y rendimiento",
    detalle:
      "Contraste AA verificado, HTML semántico, imágenes optimizadas y JavaScript solo donde hay interacción de verdad.",
    logos: [],
  },
  {
    id: "despliegue",
    titulo: "Git y despliegue",
    detalle: "Git y GitHub, despliegue continuo en Cloudflare Pages y Netlify, y Docker en lo básico.",
    logos: ["git", "github", "cloudflarepages", "docker"],
  },
];
