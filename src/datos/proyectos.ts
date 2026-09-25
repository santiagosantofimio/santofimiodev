import type { Traducible } from "@/i18n/idiomas";
import type { Logo } from "@/lib/logos";

export interface Proyecto {
  id: "sorting-visualizer" | "esta-pagina";
  nombre: Traducible;
  descripcion: Traducible;
  tecnologias: { nombre: string; logo: Logo }[];
  repositorio: string;
}

export const proyectos: Proyecto[] = [
  {
    id: "sorting-visualizer",
    nombre: { es: "SortingVisualizer", en: "SortingVisualizer" },
    descripcion: {
      es: "Visualizador de algoritmos de ordenamiento. Una API en Spring Boot calcula cada paso de Bubble, Insertion, Selection, Merge y Quick Sort, y el navegador los anima barra por barra.",
      en: "A sorting algorithm visualizer. A Spring Boot API computes every step of Bubble, Insertion, Selection, Merge and Quick Sort, and the browser animates them bar by bar.",
    },
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
    nombre: { es: "Esta página", en: "This site" },
    descripcion: {
      es: "Hecha con Astro y React solo donde hay interacción. Sistema de diseño propio en CSS, contraste verificado por script y animaciones sin librerías.",
      en: "Built with Astro, with React only where there's real interaction. Its own CSS design system, contrast checked by a script and animations without libraries.",
    },
    tecnologias: [
      { nombre: "Astro", logo: "astro" },
      { nombre: "React", logo: "react" },
      { nombre: "TypeScript", logo: "typescript" },
      { nombre: "Tailwind CSS", logo: "tailwindcss" },
    ],
    repositorio: "https://github.com/santiagosantofimio/santofimiodev",
  },
];
