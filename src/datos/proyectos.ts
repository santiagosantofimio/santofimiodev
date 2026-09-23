import type { Logo } from "@/lib/logos";

export interface Proyecto {
  id: "sorting-visualizer" | "esta-pagina";
  nombre: string;
  descripcion: string;
  tecnologias: { nombre: string; logo: Logo }[];
  repositorio: string;
}

export const proyectos: Proyecto[] = [
  {
    id: "sorting-visualizer",
    nombre: "SortingVisualizer",
    descripcion:
      "Visualizador de algoritmos de ordenamiento. Una API en Spring Boot calcula cada paso de Bubble, Insertion, Selection, Merge y Quick Sort, y el navegador los anima barra por barra.",
    tecnologias: [
      { nombre: "Java 21", logo: "java" },
      { nombre: "Spring Boot", logo: "spring" },
      { nombre: "Maven", logo: "maven" },
      { nombre: "JavaScript", logo: "javascript" },
    ],
    repositorio: "https://github.com/santiagosantofimio/SortingVisualizer",
  },
  {
    id: "esta-pagina",
    nombre: "Esta página",
    descripcion:
      "Hecha con Astro y React solo donde hay interacción. Sistema de diseño propio en CSS, contraste verificado por script y animaciones sin librerías.",
    tecnologias: [
      { nombre: "Astro", logo: "astro" },
      { nombre: "React", logo: "react" },
      { nombre: "TypeScript", logo: "typescript" },
      { nombre: "Tailwind CSS", logo: "tailwindcss" },
    ],
    repositorio: "https://github.com/santiagosantofimio/santofimiodev",
  },
];
