import type { Traducible } from "@/i18n/idiomas";
import type { Logo } from "@/lib/logos";

export interface Tecnologia {
  /** Texto fijo si el nombre es igual en los dos idiomas. */
  nombre: string | Traducible;
  logo: Logo;
}

export interface Categoria {
  id: "frontend" | "backend" | "datos";
  titulo: Traducible;
  etiqueta: Traducible;
  tecnologias: Tecnologia[];
}

// Solo lo que aparece en proyectos propios: esta página, SortingVisualizer y los demás repos.
export const categorias: Categoria[] = [
  {
    id: "frontend",
    titulo: { es: "Frontend", en: "Frontend" },
    etiqueta: { es: "Interfaz · componentes", en: "Interface · components" },
    tecnologias: [
      { nombre: "HTML5", logo: "html5" },
      { nombre: "CSS3", logo: "css3" },
      { nombre: "JavaScript", logo: "javascript" },
      { nombre: "TypeScript", logo: "typescript" },
      { nombre: "React", logo: "react" },
      { nombre: "Angular", logo: "angular" },
      { nombre: "Astro", logo: "astro" },
      { nombre: "Tailwind CSS", logo: "tailwindcss" },
      { nombre: "Vite", logo: "vite" },
    ],
  },
  {
    id: "backend",
    titulo: { es: "Backend", en: "Backend" },
    etiqueta: { es: "APIs · servicios", en: "APIs · services" },
    tecnologias: [
      { nombre: "Java", logo: "java" },
      { nombre: "Spring Boot", logo: "spring" },
      { nombre: "Maven", logo: "maven" },
      { nombre: { es: "JPA y Hibernate", en: "JPA & Hibernate" }, logo: "hibernate" },
      { nombre: "JUnit", logo: "junit" },
      { nombre: { es: "Lua y Luau", en: "Lua & Luau" }, logo: "lua" },
    ],
  },
  {
    id: "datos",
    titulo: { es: "Datos y DevOps", en: "Data & DevOps" },
    etiqueta: { es: "Persistencia · infra", en: "Persistence · infra" },
    tecnologias: [
      { nombre: "PostgreSQL", logo: "postgresql" },
      { nombre: "Docker", logo: "docker" },
      { nombre: "Git", logo: "git" },
      { nombre: "GitHub", logo: "github" },
      { nombre: "Cloudflare Pages", logo: "cloudflare" },
      { nombre: "Netlify", logo: "netlify" },
    ],
  },
];
