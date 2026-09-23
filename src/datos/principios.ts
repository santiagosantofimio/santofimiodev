export interface Principio {
  id: "movil" | "accesible" | "rapido" | "historial";
  titulo: string;
  detalle: string;
  /** Dónde se puede comprobar, dentro del repositorio de esta página. */
  prueba?: { texto: string; ruta: string };
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
    prueba: { texto: "Ver el script", ruta: "/blob/main/scripts/contraste.mjs" },
  },
  {
    id: "rapido",
    titulo: "Rápido por defecto",
    detalle: "HTML estático, fuentes servidas desde el propio sitio y JavaScript solo en lo que se mueve o responde.",
    prueba: { texto: "Ver la configuración", ruta: "/blob/main/astro.config.mjs" },
  },
  {
    id: "historial",
    titulo: "Un historial que se entiende",
    detalle: "Commits pequeños, en español y con un solo propósito cada uno.",
    prueba: { texto: "Ver los commits", ruta: "/commits/main" },
  },
];
