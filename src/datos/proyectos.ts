export interface Proyecto {
  id: string;
  nombre: string;
  descripcion: string;
  tecnologias: string[];
  repositorio: string;
}

export const proyectos: Proyecto[] = [
  {
    id: "sorting-visualizer",
    nombre: "SortingVisualizer",
    descripcion:
      "Visualizador de algoritmos de ordenamiento. Una API en Spring Boot calcula cada paso de Bubble, Insertion, Selection, Merge y Quick Sort, y el navegador los anima barra por barra.",
    tecnologias: ["Java 21", "Spring Boot", "Maven", "JavaScript"],
    repositorio: "https://github.com/santiagosantofimio/SortingVisualizer",
  },
];
