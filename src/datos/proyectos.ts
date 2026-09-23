import type { Logo } from "@/lib/logos";

export interface Proyecto {
  id: string;
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
      { nombre: "Java 21", logo: "openjdk" },
      { nombre: "Spring Boot", logo: "springboot" },
      { nombre: "Maven", logo: "apachemaven" },
      { nombre: "JavaScript", logo: "javascript" },
    ],
    repositorio: "https://github.com/santiagosantofimio/SortingVisualizer",
  },
];
