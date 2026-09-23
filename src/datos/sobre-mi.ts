export interface Formacion {
  id: "universidad" | "cursos" | "propios";
  titulo: string;
  detalle: string;
}

export const parrafos: string[] = [
  "Soy desarrollador web y vivo en Bogotá. Me he formado en la universidad, en cursos en línea y, sobre todo, construyendo proyectos propios de principio a fin.",
  "Me muevo entre el frontend y el backend: de una interfaz en React o Astro a una API en Java con Spring Boot.",
  "Me importa que lo que hago funcione para cualquiera: que cargue rápido, que se pueda usar con el teclado y que se lea bien en cualquier pantalla.",
  "Ahora busco trabajo en un equipo de desarrollo.",
];

export const formacion: Formacion[] = [
  { id: "universidad", titulo: "Universidad", detalle: "La base formal." },
  { id: "cursos", titulo: "Cursos en línea", detalle: "Para aprender herramientas nuevas rápido." },
  { id: "propios", titulo: "Proyectos propios", detalle: "Donde más aprendo: construyendo." },
];
