export interface Principio {
  id: "movil" | "accesible" | "rapido" | "historial";
  titulo: string;
  detalle: string;
}

export const principios: Principio[] = [
  {
    id: "movil",
    titulo: "Primero el celular",
    detalle: "Diseño desde 360 px hacia arriba. Esta página no hace scroll horizontal en ningún ancho.",
  },
  {
    id: "accesible",
    titulo: "Accesible desde el principio",
    detalle: "HTML semántico, navegación completa con teclado y cada color verificado con un script de contraste.",
  },
  {
    id: "rapido",
    titulo: "Rápido por defecto",
    detalle: "HTML estático, fuentes servidas desde el propio sitio y JavaScript solo en lo que se mueve o responde.",
  },
  {
    id: "historial",
    titulo: "Un historial que se entiende",
    detalle: "Commits pequeños, en español y con un solo propósito cada uno.",
  },
];
