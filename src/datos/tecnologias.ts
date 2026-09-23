import type { Logo } from "@/lib/logos";

export interface Tecnologia {
  nombre: string;
  logo: Logo;
}

export interface Categoria {
  id: "frontend" | "backend" | "datos";
  titulo: string;
  etiqueta: string;
  tecnologias: Tecnologia[];
}

// Solo lo que aparece en proyectos propios: esta página, SortingVisualizer y los demás repos.
export const categorias: Categoria[] = [
  {
    id: "frontend",
    titulo: "Frontend",
    etiqueta: "Interfaz · componentes",
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
    titulo: "Backend",
    etiqueta: "APIs · servicios",
    tecnologias: [
      { nombre: "Java", logo: "java" },
      { nombre: "Spring Boot", logo: "spring" },
      { nombre: "Maven", logo: "maven" },
      { nombre: "JPA y Hibernate", logo: "hibernate" },
      { nombre: "JUnit", logo: "junit" },
      { nombre: "Lua y Luau", logo: "lua" },
    ],
  },
  {
    id: "datos",
    titulo: "Datos y DevOps",
    etiqueta: "Persistencia · infra",
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
