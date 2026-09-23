# santofimiodev

Mi página: hago sitios web para negocios pequeños en Bogotá. Es una sola página hecha con
Astro, con React únicamente donde hace falta: el estimador de presupuesto, el cambio de tema y
el menú del celular. Todo lo demás sale como HTML estático.

En vivo: https://santofimiodev.pages.dev

## Correrla en tu máquina

Necesitas Node 22.12 o más nuevo.

```bash
npm install
npm run dev
```

Queda en http://localhost:4321.

Otros comandos:

```bash
npm run build       # revisa tipos con astro check y genera dist/
npm run preview     # sirve dist/ como quedaría publicado
npm run lint        # ESLint, incluidas reglas de accesibilidad
npm run contraste   # verifica el contraste de todos los colores en los dos modos
```

## Cambiar textos y precios

Todo el contenido vive en `src/datos/`, un archivo por tema. No hay que tocar componentes.

| Qué quieres cambiar | Archivo |
| --- | --- |
| Nombre, WhatsApp, correo, GitHub, LinkedIn, tiempo de respuesta | `src/datos/perfil.ts` |
| Los tipos de encargo de "Qué hago" | `src/datos/servicios.ts` |
| Los pasos de "Cómo trabajo" | `src/datos/proceso.ts` |
| Preguntas, opciones, precios y semanas del estimador | `src/datos/estimador.ts` |
| Las tecnologías de "Con qué construyo" | `src/datos/stack.ts` |
| Los proyectos de "Otros proyectos" | `src/datos/proyectos.ts` |

Los precios del estimador están en pesos y sin puntos (`700_000`); el formato con signo y
separadores lo pone `src/lib/formato.ts`. Cambiar un precio es cambiar un número.

Los enlaces de WhatsApp se arman en `src/lib/whatsapp.ts` a partir del número de `perfil.ts`. Ahí
también está el texto del botón principal, que es el mismo en todo el sitio.

## Publicarla

Está en Cloudflare Pages, conectada a este repositorio: cada push a `main` publica solo.

Si hay que configurarla de nuevo: en Cloudflare, Workers & Pages, crear un proyecto de **Pages**
(no de Workers) conectado a GitHub, con el comando de build `npm run build` y el directorio de
salida `dist`. Si el panel empuja hacia `wrangler deploy`, buscar el enlace para seguir con el
flujo de Pages.

Si cambia la dirección del sitio, hay que actualizarla en tres lugares: `site` en
`astro.config.mjs`, `sitio` en `src/datos/perfil.ts` y la línea `Sitemap` de `public/robots.txt`.

## Sistema de diseño

Los tokens están en `src/estilos/global.css`.

**Color.** Oscuro por defecto: tinta cálida casi negra (`#15120f`) con texto crema (`#f1e9da`). El
modo claro se activa con `data-tema="claro"` en `<html>` y se guarda en el navegador. Hay un solo
acento, un rojo señal: `#ff5a36` en oscuro y `#bb2c13` en claro, porque el mismo tono no pasa el
contraste en los dos fondos. La paleta por defecto de Tailwind está borrada, así que solo existen
los colores del sitio (`fondo`, `superficie`, `texto`, `texto-suave`, `linea`, `linea-fuerte`,
`acento`, `sobre-acento`). Antes de cambiar un color, correr `npm run contraste`: revisa nueve
combinaciones por modo y falla si alguna no llega a AA.

**Esquinas.** Un solo radio para todo: 8 px (`rounded-base`). Botones, opciones del estimador,
etiquetas, paneles y el anillo de foco. No hay píldoras ni círculos, y los demás radios de
Tailwind también están borrados para que no se cuelen.

**Tipografía.** Schibsted Grotesk para títulos, Geist para el texto y JetBrains Mono solo para
etiquetas técnicas. Las tres se sirven desde el propio sitio con Fontsource.

**Movimiento.** Una sola curva de salida (`ease-salida`) y cuatro duraciones. Las secciones
aparecen al entrar en pantalla y los enlaces internos se desplazan con una animación propia. Si
el sistema pide menos movimiento, todo eso se apaga.
