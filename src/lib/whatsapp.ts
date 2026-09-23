import { perfil } from "@/datos/perfil";

export type ContextoWhatsApp = "general" | "servicios" | "cierre";

const mensajes: Record<ContextoWhatsApp, string> = {
  general: "Hola Santiago, vi tu página y quiero hablar de una página web para mi negocio.",
  servicios: "Hola Santiago, vi lo que haces y tengo una pregunta sobre una página para mi negocio.",
  cierre: "Hola Santiago, quiero empezar con la página de mi negocio. ¿Cuándo podemos hablar?",
};

/** Arma el enlace de wa.me con un mensaje según el contexto, o con un texto propio. */
export function enlaceWhatsApp(contexto: ContextoWhatsApp | { texto: string } = "general"): string {
  const texto = typeof contexto === "string" ? mensajes[contexto] : contexto.texto;
  return `https://wa.me/${perfil.whatsapp}?text=${encodeURIComponent(texto)}`;
}

/** El único texto para el llamado fuerte a escribir, en todo el sitio. */
export const TEXTO_CTA_WHATSAPP = "Escríbeme por WhatsApp";
