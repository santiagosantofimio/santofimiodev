export interface Paso {
  id: string;
  titulo: string;
  detalle: string;
}

export const proceso: Paso[] = [
  {
    id: "conversacion",
    titulo: "Hablamos de tu negocio",
    detalle:
      "Por WhatsApp o en una llamada corta. Me cuentas qué vendes, a quién y qué quieres que haga la gente cuando entre a la página.",
  },
  {
    id: "propuesta",
    titulo: "Te mando una propuesta con precio cerrado",
    detalle:
      "Por escrito: qué incluye, cuánto cuesta y cuándo te la entrego. Empiezo cuando pagas el 50% de anticipo, y el resto al final.",
  },
  {
    id: "construccion",
    titulo: "Construyo y ves el avance",
    detalle:
      "Te comparto un enlace donde ves la página tomando forma. Si algo no te cuadra, lo dices en ese momento y no al final.",
  },
  {
    id: "entrega",
    titulo: "Entrego con dominio y un periodo de ajustes",
    detalle:
      "La página queda publicada en tu dominio, a tu nombre. Después de la entrega hay un periodo para corregir detalles sin costo.",
  },
];
