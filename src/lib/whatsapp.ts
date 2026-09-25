import { perfil } from "@/datos/perfil";

/** Arma el enlace de wa.me con el mensaje ya escrito. */
export function enlaceWhatsApp(texto: string): string {
  return `https://wa.me/${perfil.whatsapp}?text=${encodeURIComponent(texto)}`;
}
