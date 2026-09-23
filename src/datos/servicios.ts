export interface Servicio {
  id: string;
  nombre: string;
  paraQuien: string;
  incluye: string;
}

export const servicios: Servicio[] = [
  {
    id: "una-pagina",
    nombre: "Página de una sola hoja para tu negocio",
    paraQuien: "Para el negocio que todavía no tiene página.",
    incluye:
      "Qué ofreces, precios, horario, cómo llegar con mapa y un botón que abre WhatsApp. Todo en una página que se lee bien en el celular.",
  },
  {
    id: "campana",
    nombre: "Página para una campaña",
    paraQuien: "Para cuando tienes algo puntual que anunciar.",
    incluye:
      "Una página enfocada en una sola cosa, una promoción, una apertura o una temporada, con un solo botón que lleva a escribirte.",
  },
  {
    id: "rediseno",
    nombre: "Rediseño de un sitio que se ve viejo",
    paraQuien: "Para el sitio que ya tienes y te da pena mandar.",
    incluye:
      "Reviso lo que hay, ordeno el contenido y lo vuelvo a construir para que cargue rápido y se vea bien en cualquier pantalla.",
  },
  {
    id: "mantenimiento",
    nombre: "Mantenimiento y cambios",
    paraQuien: "Para después de la entrega.",
    incluye:
      "Cambiar precios, fotos u horarios, o agregar una sección nueva cuando lo necesites, sin que tengas que tocar nada técnico.",
  },
];
