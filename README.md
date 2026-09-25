# santofimiodev

Mi portafolio. Está en [santofimiodev.pages.dev](https://santofimiodev.pages.dev), en español y en inglés.

Lo hice con Astro y TypeScript. Casi todo sale como HTML estático; React lo usé solo en las partes
que de verdad responden al usuario: la demo de ordenamiento, el botón de tema y el menú del
celular. Los estilos van con Tailwind CSS 4 y las animaciones son CSS y un poco de JavaScript, sin
librerías.

## Para correrlo

Con Node 22.12 o más nuevo:

```bash
npm install
npm run dev
```

y queda en http://localhost:4321.

`npm run build` genera el sitio en `dist/` (antes revisa los tipos con `astro check`),
`npm run lint` pasa ESLint con reglas de accesibilidad y `npm run contraste` revisa que todos los
colores cumplan AA en modo claro y oscuro.

## Cómo está organizado

- `src/datos/`: el contenido. Cada texto tiene su versión en español y en inglés al lado.
- `src/i18n/`: los textos cortos de la interfaz y la configuración de los idiomas (español en `/`,
  inglés en `/en/`).
- `src/componentes/` y `src/islas/`: las secciones en Astro y los componentes de React.
- `src/lib/`: los scripts de interacción, como el nombre del inicio, la credencial, la carpeta y el
  cambio de tema.
- `src/estilos/global.css`: colores, tipografía, espaciado y animaciones.
- `scripts/contraste.mjs`: calcula el contraste de cada par de colores con la fórmula de WCAG.

## Algunas decisiones

La paleta es solo de grises. Quité la paleta por defecto de Tailwind para no terminar usando
colores por fuera de los míos.

La tipografía es Mona Sans, que es variable en grosor y en ancho: los títulos van anchos y el
texto normal. El nombre del inicio aprovecha eso, y cada letra se engrosa y se ensancha según qué
tan cerca esté el mouse. Para las etiquetas uso Martian Mono. Las dos se sirven desde el mismo
sitio con Fontsource.

Todo lo que se mueve respeta la opción de reducir movimiento del sistema, y las animaciones que se
repiten solo corren cuando están en pantalla.

## Créditos

Los logos de tecnologías son de [devicon](https://devicon.dev) (MIT). El código QR de la credencial
se genera al compilar con [qrcode](https://github.com/soldair/node-qrcode).

## Despliegue

Cloudflare Pages, conectado a este repositorio. Cada push a `main` se publica solo.
