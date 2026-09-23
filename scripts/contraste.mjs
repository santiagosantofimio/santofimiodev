// Lee los tokens de color de global.css y verifica cada combinación de texto
// y fondo que usa el sitio con la fórmula de luminancia relativa de WCAG 2.
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../src/estilos/global.css", import.meta.url), "utf8");

function leerBloque(selector) {
  const inicio = css.indexOf(`${selector} {`);
  if (inicio === -1) throw new Error(`No encontré el bloque ${selector}`);
  const cuerpo = css.slice(inicio, css.indexOf("}", inicio));
  return Object.fromEntries(
    [...cuerpo.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map(([, nombre, valor]) => [nombre, valor]),
  );
}

function luminancia(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function razon(a, b) {
  const [claro, oscuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (oscuro + 0.05);
}

// [texto, fondo, mínimo]. 4.5 para texto normal, 3 para bordes de controles y el foco.
const pares = [
  ["texto", "fondo", 4.5],
  ["texto", "superficie", 4.5],
  ["texto-suave", "fondo", 4.5],
  ["texto-suave", "superficie", 4.5],
  ["acento", "fondo", 4.5],
  ["acento", "superficie", 4.5],
  ["sobre-acento", "acento", 4.5],
  ["linea-fuerte", "fondo", 3],
  ["linea-fuerte", "superficie", 3],
];

const modos = {
  oscuro: leerBloque(":root"),
  claro: leerBloque(':root[data-tema="claro"]'),
};

let fallas = 0;

for (const [modo, tokens] of Object.entries(modos)) {
  console.log(`\nModo ${modo}`);
  for (const [texto, fondo, minimo] of pares) {
    const valor = razon(tokens[texto], tokens[fondo]);
    const pasa = valor >= minimo;
    if (!pasa) fallas++;
    const marca = pasa ? "ok   " : "FALLA";
    console.log(`  ${marca} ${texto.padEnd(13)} sobre ${fondo.padEnd(11)} ${valor.toFixed(2)}:1 (mín. ${minimo})`);
  }
}

if (fallas > 0) {
  console.error(`\n${fallas} combinaciones no pasan AA.`);
  process.exit(1);
}

console.log("\nTodas las combinaciones pasan AA.");
