export interface Perfil {
  nombre: string;
  oficio: string;
  ciudad: string;
  /** Lo que busca ahora, dicho en una frase. */
  busqueda: string;
  /** Solo dígitos, con indicativo de país. Es lo que usa el enlace de wa.me. */
  whatsapp: string;
  whatsappVisible: string;
  correo: string;
  github: string;
  linkedin: string;
  /** Tiempo de respuesta comprometido, tal como se dice en el sitio. */
  respuesta: string;
  sitio: string;
  repositorio: string;
}

export const perfil: Perfil = {
  nombre: "Santiago Santofimio",
  oficio: "Desarrollador web",
  ciudad: "Bogotá",
  busqueda: "Busco trabajo como desarrollador web",
  whatsapp: "573102794632",
  whatsappVisible: "+57 310 279 4632",
  correo: "santofimiodeveloper@gmail.com",
  github: "https://github.com/santiagosantofimio",
  linkedin: "https://www.linkedin.com/in/santiagosantofimio/",
  respuesta: "Respondo en una a tres horas.",
  sitio: "https://santofimiodev.pages.dev",
  repositorio: "https://github.com/santiagosantofimio/santofimiodev",
};
