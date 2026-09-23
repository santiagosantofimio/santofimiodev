# santofimiodev

Mi página personal: quién soy, qué sé hacer y en qué he trabajado. Es una sola página hecha con
Astro, con React únicamente donde hay interacción de verdad: la demo de ordenamiento, el cambio de
tema y el menú del celular. Todo lo demás sale como HTML estático.

En vivo: [santofimiodev.pages.dev](https://santofimiodev.pages.dev)

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

## Cambiar los textos

Todo el contenido vive en `src/datos/`, un archivo por tema. No hay que tocar componentes.

| Qué quieres cambiar | Archivo |
| --- | --- |
| Nombre, correo, WhatsApp, GitHub, LinkedIn, tiempo de respuesta | `src/datos/perfil.ts` |
| Los párrafos de "Sobre mí" y cómo aprendí | `src/datos/sobre-mi.ts` |
| Los proyectos | `src/datos/proyectos.ts` |
| Las tecnologías, por categoría, y la cinta de logos | `src/datos/tecnologias.ts` |
| Los principios de "Cómo trabajo" | `src/datos/principios.ts` |

Los logos de tecnologías son los originales a color de [devicon](https://devicon.dev) (licencia
MIT) y viven en `public/logos/`. Para usar uno nuevo, se copia su SVG ahí, se registra en
`src/lib/logos.ts` y después se puede nombrar desde cualquier archivo de datos. Si el logo es negro
o muy oscuro, se marca con `oscuro: true` para que se aclare en el modo oscuro.

## Publicarla

Está en Cloudflare Pages, conectada a este repositorio: cada push a `main` publica solo.

Si hay que configurarla de nuevo: en Cloudflare, Workers & Pages, crear un proyecto de **Pages**
(no de Workers) conectado a GitHub, con el comando de build `npm run build` y el directorio de
salida `dist`. La versión de Node la toma de `.node-version`.

Si cambia la dirección del sitio, hay que actualizarla en tres lugares: `site` en
`astro.config.mjs`, `sitio` en `src/datos/perfil.ts` y la línea `Sitemap` de `public/robots.txt`.

## Sistema de diseño

Los tokens están en `src/estilos/global.css`.

**Color.** Todo el sitio es gris, sin un color de acento aparte. En oscuro, que es el modo por
defecto, el fondo es grafito (`#111214`) con texto casi blanco (`#ececee`), y el botón principal va
en gris plata (`#d9dade`). En claro se invierte: fondo gris claro (`#e9eaec`) y botón grafito
(`#26272b`). El modo claro se activa con `data-tema="claro"` en `<html>` y queda guardado en el
navegador. La paleta por defecto de Tailwind está borrada, así que solo existen los colores del
sitio. Antes de cambiar un color, correr `npm run contraste`: revisa todas las combinaciones de los
dos modos y falla si alguna no llega a AA.

**Esquinas.** 8 px (`rounded-base`) para botones, etiquetas, campos y el anillo de foco. Las
tarjetas son dobles: un marco de 12 px (`rounded-marco`) con un núcleo de 8 px adentro, separados
por 4 px, para que las curvas sean concéntricas. No hay píldoras. La única forma redonda son los
iconos de "Cómo trabajo", que van en círculos para distinguir los pasos de las tarjetas.

**Tipografía.** Schibsted Grotesk para títulos, Geist para el texto y JetBrains Mono para
etiquetas y datos técnicos. Las tres se sirven desde el propio sitio con Fontsource. Schibsted es
una fuente variable, y de eso depende el efecto del nombre en el inicio.

**Movimiento.** Sin librerías: CSS, IntersectionObserver y un poco de JavaScript. Dos curvas
(`ease-salida` para lo que entra o sale, `ease-movimiento` para lo que se transforma en pantalla) y
cuatro duraciones.

- El nombre del inicio entra letra por letra y después cambia de grosor según la cercanía del
  mouse. En pantallas táctiles, un toque manda una onda.
- Al lado del nombre cuelga una credencial de una cinta. Se puede agarrar y soltar (con mouse o
  con el dedo) y vuelve al centro oscilando como un péndulo; con el mouse encima se inclina y le
  cae un brillo. Su código QR, que abre LinkedIn, se genera al compilar con `qrcode`.
- "Sobre mí" vive en una carpeta: con mouse se abre al pasar por encima; con clic, toque o
  teclado queda abierta. El frente gira hacia quien mira y deja ver la hoja.
- La navbar se vuelve una barra flotante al bajar, con una línea que marca cuánto se ha leído.
- El cambio de tema se revela en un círculo que crece desde el botón (View Transitions).
- Las secciones aparecen al entrar en pantalla, las tecnologías entran en cascada, los principios
  se encienden en orden y los logos pasan en una cinta que no se detiene.
- Las tarjetas tienen un brillo que sigue al mouse, las de proyectos se inclinan un poco y los
  botones principales se corren hacia el puntero.

Lo que se repite solo corre mientras está a la vista. Si el sistema pide menos movimiento, todo
eso se apaga y queda el estado final.
