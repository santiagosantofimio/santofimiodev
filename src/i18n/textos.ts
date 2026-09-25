import type { Idioma } from "@/i18n/idiomas";

// Los textos de la interfaz. El contenido largo vive en src/datos/, con sus dos idiomas al lado.
const es = {
  pagina: {
    titulo: "Santiago Santofimio, desarrollador web en Bogotá",
    descripcion:
      "Desarrollador web en Bogotá. Interfaces rápidas y accesibles con Astro, React y TypeScript, y backend con Java y Spring Boot. Busco trabajo en un equipo de desarrollo.",
    imagenAlt: "Santiago Santofimio, desarrollador web en Bogotá.",
    imagen: "/og.png",
    saltar: "Saltar al contenido",
  },
  navegacion: {
    etiqueta: "Principal",
    sobreMi: "Sobre mí",
    proyectos: "Proyectos",
    tecnologias: "Tecnologías",
    contacto: "Contacto",
    escribeme: "Escríbeme",
    menu: "Menú",
    abrirMenu: "Abrir menú",
    cerrarMenu: "Cerrar menú",
    temaClaro: "Cambiar a modo claro",
    temaOscuro: "Cambiar a modo oscuro",
    otroIdioma: { corto: "EN", largo: "Read in English" },
  },
  hero: {
    verProyectos: "Ver proyectos",
    credencial: (nombre: string, rol: string, ciudad: string) =>
      `Credencial de ${nombre}, ${rol} en ${ciudad}, con un código QR que abre su LinkedIn.`,
  },
  sobreMi: {
    titulo: "Sobre mí",
    comoAprendi: "Cómo aprendí",
    abrir: "Abrir",
    cerrar: "Cerrar",
  },
  proyectos: {
    titulo: "Proyectos",
    masEnGithub: "Más en mi GitHub",
    repositorio: "(repositorio en GitHub)",
    notaDemo:
      "Versión en miniatura hecha para esta página. En el proyecto real, los pasos los calcula una API de Spring Boot.",
    contrasteTitulo: "Contraste del tema actual, medido en vivo",
    contrastePares: ["Texto sobre fondo", "Texto suave sobre fondo", "Botón principal"],
    probarTema: "Probar en el otro tema",
  },
  demo: {
    algoritmo: "Algoritmo",
    ordenar: "Ordenar",
    detener: "Detener",
    mezclar: "Mezclar",
    detenido: "Detenido.",
    ordenando: (algoritmo: string) => `Ordenando con ${algoritmo}.`,
    resultado: (algoritmo: string, comparaciones: number, escrituras: number) =>
      `${algoritmo}: ${comparaciones} comparaciones y ${escrituras} escrituras.`,
  },
  tecnologias: {
    titulo: "Tecnologías",
    entrada: "Las que he usado en proyectos propios, de la interfaz a la base de datos.",
  },
  principios: {
    titulo: "Cómo trabajo",
    entrada: "Cuatro costumbres que se notan en el código de esta misma página.",
  },
  contacto: {
    titulo: "Hablemos.",
    entrada: "Si tienes un puesto o un proyecto en el que pueda aportar, escríbeme.",
    copiar: "Copiar correo",
    copiado: "Copiado",
    aviso: "Correo copiado.",
    filas: { correo: "Correo", linkedin: "LinkedIn", github: "GitHub", whatsapp: "WhatsApp" },
    saludoWhatsapp: "Hola Santiago, vi tu página y quiero hablar contigo.",
  },
};

export type Textos = typeof es;

const en: Textos = {
  pagina: {
    titulo: "Santiago Santofimio, software developer in Bogotá",
    descripcion:
      "Software developer in Bogotá. Fast, accessible interfaces with Astro, React and TypeScript, and backends with Java and Spring Boot. Looking for a job on a development team.",
    imagenAlt: "Santiago Santofimio, software developer in Bogotá.",
    imagen: "/og-en.png",
    saltar: "Skip to content",
  },
  navegacion: {
    etiqueta: "Main",
    sobreMi: "About",
    proyectos: "Projects",
    tecnologias: "Stack",
    contacto: "Contact",
    escribeme: "Email me",
    menu: "Menu",
    abrirMenu: "Open menu",
    cerrarMenu: "Close menu",
    temaClaro: "Switch to light mode",
    temaOscuro: "Switch to dark mode",
    otroIdioma: { corto: "ES", largo: "Ver en español" },
  },
  hero: {
    verProyectos: "See projects",
    credencial: (nombre, rol, ciudad) =>
      `ID badge of ${nombre}, ${rol} in ${ciudad}, with a QR code that opens the LinkedIn profile.`,
  },
  sobreMi: {
    titulo: "About me",
    comoAprendi: "How I learned",
    abrir: "Open",
    cerrar: "Close",
  },
  proyectos: {
    titulo: "Projects",
    masEnGithub: "More on my GitHub",
    repositorio: "(GitHub repository)",
    notaDemo: "A miniature version built for this page. In the real project, a Spring Boot API computes the steps.",
    contrasteTitulo: "Current theme contrast, measured live",
    contrastePares: ["Text on background", "Muted text on background", "Primary button"],
    probarTema: "Try the other theme",
  },
  demo: {
    algoritmo: "Algorithm",
    ordenar: "Sort",
    detener: "Stop",
    mezclar: "Shuffle",
    detenido: "Stopped.",
    ordenando: (algoritmo) => `Sorting with ${algoritmo}.`,
    resultado: (algoritmo, comparaciones, escrituras) =>
      `${algoritmo}: ${comparaciones} comparisons and ${escrituras} writes.`,
  },
  tecnologias: {
    titulo: "Tech stack",
    entrada: "The ones I've used in my own projects, from the interface to the database.",
  },
  principios: {
    titulo: "How I work",
    entrada: "Four habits you can see in the code of this very site.",
  },
  contacto: {
    titulo: "Let's talk.",
    entrada: "If you have a role or a project where I can contribute, write to me.",
    copiar: "Copy email",
    copiado: "Copied",
    aviso: "Email copied.",
    filas: { correo: "Email", linkedin: "LinkedIn", github: "GitHub", whatsapp: "WhatsApp" },
    saludoWhatsapp: "Hi Santiago, I saw your website and I'd like to talk.",
  },
};

export const textos: Record<Idioma, Textos> = { es, en };
