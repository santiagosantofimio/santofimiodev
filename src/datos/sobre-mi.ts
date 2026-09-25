import type { Traducible } from "@/i18n/idiomas";

export interface Formacion {
  id: "universidad" | "cursos" | "propios";
  titulo: Traducible;
  detalle: Traducible;
}

export const parrafos: Traducible[] = [
  {
    es: "Soy desarrollador web y vivo en Bogotá. Me he formado en la universidad, en cursos en línea y, sobre todo, construyendo proyectos propios de principio a fin.",
    en: "I'm a web developer based in Bogotá. I've learned at university, through online courses and, above all, by building my own projects from start to finish.",
  },
  {
    es: "Me muevo entre el frontend y el backend: de una interfaz en React o Astro a una API en Java con Spring Boot.",
    en: "I work across frontend and backend: from an interface in React or Astro to a Java API with Spring Boot.",
  },
  {
    es: "Me importa que lo que hago funcione para cualquiera: que cargue rápido, que se pueda usar con el teclado y que se lea bien en cualquier pantalla.",
    en: "I care about what I build working for everyone: fast to load, usable with a keyboard and easy to read on any screen.",
  },
  {
    es: "Ahora busco trabajo en un equipo de desarrollo.",
    en: "I'm currently looking for a job on a development team.",
  },
];

export const formacion: Formacion[] = [
  {
    id: "universidad",
    titulo: { es: "Universidad", en: "University" },
    detalle: { es: "La base formal.", en: "The formal foundation." },
  },
  {
    id: "cursos",
    titulo: { es: "Cursos en línea", en: "Online courses" },
    detalle: { es: "Para aprender herramientas nuevas rápido.", en: "To pick up new tools quickly." },
  },
  {
    id: "propios",
    titulo: { es: "Proyectos propios", en: "Personal projects" },
    detalle: { es: "Donde más aprendo: construyendo.", en: "Where I learn the most: by building." },
  },
];
