import type { Traducible } from "@/i18n/idiomas";

export interface Principio {
  id: "movil" | "accesible" | "rapido" | "historial";
  titulo: Traducible;
  detalle: Traducible;
}

export const principios: Principio[] = [
  {
    id: "movil",
    titulo: { es: "Primero el celular", en: "Mobile first" },
    detalle: {
      es: "Diseño desde 360 px hacia arriba. Esta página no hace scroll horizontal en ningún ancho.",
      en: "I design from 360 px up. This site never scrolls sideways, at any width.",
    },
  },
  {
    id: "accesible",
    titulo: { es: "Accesible desde el principio", en: "Accessible from the start" },
    detalle: {
      es: "HTML semántico, navegación completa con teclado y cada color verificado con un script de contraste.",
      en: "Semantic HTML, full keyboard navigation and every color checked with a contrast script.",
    },
  },
  {
    id: "rapido",
    titulo: { es: "Rápido por defecto", en: "Fast by default" },
    detalle: {
      es: "HTML estático, fuentes servidas desde el propio sitio y JavaScript solo en lo que se mueve o responde.",
      en: "Static HTML, self-hosted fonts and JavaScript only for what moves or responds.",
    },
  },
  {
    id: "historial",
    titulo: { es: "Un historial que se entiende", en: "A history that reads well" },
    detalle: {
      es: "Commits pequeños, en español y con un solo propósito cada uno.",
      en: "Small commits, each with a single purpose.",
    },
  },
];
