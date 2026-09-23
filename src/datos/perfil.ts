export interface Perfil {
  nombre: string;
  oficio: string;
  ciudad: string;
  /** Solo dígitos, con indicativo de país. Es lo que usa el enlace de wa.me. */
  whatsapp: string;
  whatsappVisible: string;
  github: string;
  /** Opcionales: si no están, el sitio no los muestra. */
  correo?: string;
  linkedin?: string;
}

export const perfil: Perfil = {
  nombre: "Santiago Santofimio",
  oficio: "Desarrollador web",
  ciudad: "Bogotá",
  whatsapp: "573102794632",
  whatsappVisible: "+57 310 279 4632",
  github: "https://github.com/santiagosantofimio",
};
