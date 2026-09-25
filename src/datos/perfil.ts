import type { Traducible } from "@/i18n/idiomas";

export interface Perfil {
  nombre: string;
  oficio: Traducible;
  /** El cargo, tal como aparece bajo el nombre y en la credencial. Igual en los dos idiomas. */
  rol: string;
  ciudad: string;
  pais: Traducible;
  /** Solo dígitos, con indicativo de país. Es lo que usa el enlace de wa.me. */
  whatsapp: string;
  whatsappVisible: string;
  correo: string;
  github: string;
  linkedin: string;
  /** Tiempo de respuesta comprometido, tal como se dice en el sitio. */
  respuesta: Traducible;
  sitio: string;
  repositorio: string;
}

export const perfil: Perfil = {
  nombre: "Santiago Santofimio",
  oficio: { es: "Desarrollador web", en: "Web developer" },
  rol: "Software Developer",
  ciudad: "Bogotá",
  pais: { es: "Colombia", en: "Colombia" },
  whatsapp: "573102794632",
  whatsappVisible: "+57 310 279 4632",
  correo: "santofimiodeveloper@gmail.com",
  github: "https://github.com/santiagosantofimio",
  linkedin: "https://www.linkedin.com/in/santiagosantofimio/",
  respuesta: { es: "Respondo en una a tres horas.", en: "I reply within one to three hours." },
  sitio: "https://santofimiodev.pages.dev",
  repositorio: "https://github.com/santiagosantofimio/santofimiodev",
};
