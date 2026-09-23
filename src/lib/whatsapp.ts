import { perfil } from "@/datos/perfil";

const saludo = "Hola Santiago, vi tu página y quiero hablar contigo.";

/** Arma el enlace de wa.me con un saludo, o con un texto propio. */
export function enlaceWhatsApp(texto: string = saludo): string {
  return `https://wa.me/${perfil.whatsapp}?text=${encodeURIComponent(texto)}`;
}
