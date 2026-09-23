/*
  Precios en pesos colombianos y tiempos en semanas. Cambiar una cifra es
  editar una línea de este archivo. El rango lo define el tipo de sitio; las
  demás respuestas solo suman tiempo o van en el mensaje de WhatsApp.
*/

export interface Opcion {
  id: string;
  etiqueta: string;
  /** Rango base en COP. Solo lo tienen las opciones de la pregunta de tipo de sitio. */
  precio?: { desde: number; hasta: number };
  /** Rango base de entrega en semanas, junto al precio. */
  semanas?: { desde: number; hasta: number };
  /** Semanas que se suman al rango de entrega. */
  semanasExtra?: number;
  /** Aclaración que aparece al elegir la opción. */
  nota?: string;
}

export interface Pregunta {
  id: "tipo-sitio" | "negocio" | "contenido" | "dominio";
  pregunta: string;
  opciones: Opcion[];
}

export const preguntas: Pregunta[] = [
  {
    id: "tipo-sitio",
    pregunta: "¿Qué necesitas?",
    opciones: [
      {
        id: "una-pagina",
        etiqueta: "Una página para mi negocio",
        precio: { desde: 700_000, hasta: 1_200_000 },
        semanas: { desde: 1, hasta: 2 },
      },
      {
        id: "varias-secciones",
        etiqueta: "Un sitio con varias secciones",
        precio: { desde: 1_200_000, hasta: 2_200_000 },
        semanas: { desde: 2, hasta: 4 },
      },
      {
        id: "rediseno",
        etiqueta: "Rediseñar el sitio que ya tengo",
        precio: { desde: 1_200_000, hasta: 2_200_000 },
        semanas: { desde: 2, hasta: 4 },
      },
    ],
  },
  {
    id: "negocio",
    pregunta: "¿Qué tipo de negocio tienes?",
    opciones: [
      { id: "belleza", etiqueta: "Peluquería, barbería o spa" },
      { id: "comida", etiqueta: "Restaurante, cafetería o panadería" },
      { id: "salud", etiqueta: "Consultorio" },
      { id: "tienda", etiqueta: "Tienda" },
      { id: "taller", etiqueta: "Taller o servicio técnico" },
      { id: "otro", etiqueta: "Otro" },
    ],
  },
  {
    id: "contenido",
    pregunta: "¿Tienes fotos y textos listos?",
    opciones: [
      { id: "listo", etiqueta: "Sí, tengo todo" },
      { id: "algo", etiqueta: "Tengo una parte" },
      {
        id: "nada",
        etiqueta: "No, necesito ayuda con eso",
        semanasExtra: 1,
        nota: "Te ayudo a organizar los textos. Las fotos las tomas tú o las conseguimos juntos.",
      },
    ],
  },
  {
    id: "dominio",
    pregunta: "¿Ya tienes dominio?",
    opciones: [
      { id: "si", etiqueta: "Sí, ya tengo" },
      {
        id: "no",
        etiqueta: "No, todavía no",
        nota: "Un .com cuesta entre 12 y 15 dólares al año. Lo pagas tú y queda a tu nombre.",
      },
      { id: "no-se", etiqueta: "No sé qué es eso", nota: "Es la dirección de tu página, como tunegocio.com. Te explico cuando hablemos." },
    ],
  },
];

export const avisoEstimado =
  "Es un estimado. El precio final lo confirmamos hablando, antes de empezar y por escrito.";

export const mantenimiento =
  "El mantenimiento y los cambios después de la entrega se cobran aparte, por mes o por año.";
