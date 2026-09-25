export const idiomas = ["es", "en"] as const;

export type Idioma = (typeof idiomas)[number];

/** Un texto escrito en los dos idiomas del sitio. */
export type Traducible = Record<Idioma, string>;

export const rutas: Record<Idioma, string> = { es: "/", en: "/en/" };

/** Lo que va en el atributo `lang` de <html> y en `og:locale`. */
export const codigos: Record<Idioma, { lang: string; og: string }> = {
  es: { lang: "es-CO", og: "es_CO" },
  en: { lang: "en", og: "en_US" },
};

/** Astro entrega el idioma de la página como texto; aquí se vuelve un Idioma seguro. */
export function idiomaDe(locale: string | undefined): Idioma {
  return locale === "en" ? "en" : "es";
}
