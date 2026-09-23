import { alternarTema } from "@/lib/tema";

/*
  El medidor de la tarjeta "Esta página": lee los colores reales del tema
  activo y calcula su contraste con la misma fórmula del script del repo.
  Se actualiza solo al cambiar de tema.
*/
function luminancia(color: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(color.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function razon(a: string, b: string) {
  const [claro, oscuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (oscuro + 0.05);
}

const formato = new Intl.NumberFormat("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function iniciarContrasteVivo() {
  const filas = document.querySelectorAll<HTMLElement>("[data-contraste]");
  if (filas.length === 0) return;

  const actualizar = () => {
    const estilos = getComputedStyle(document.documentElement);
    filas.forEach((fila) => {
      const [texto, fondo] = (fila.dataset.contraste ?? "").split(",");
      const valor = razon(estilos.getPropertyValue(`--${texto}`).trim(), estilos.getPropertyValue(`--${fondo}`).trim());
      const salida = fila.querySelector("[data-valor]");
      if (salida) salida.textContent = `${formato.format(valor)}:1`;
      fila.dataset.nivel = valor >= 7 ? "AAA" : valor >= 4.5 ? "AA" : "no";
      const nivel = fila.querySelector("[data-nivel-texto]");
      if (nivel) nivel.textContent = valor >= 7 ? "AAA" : valor >= 4.5 ? "AA" : "No pasa";
    });
  };

  actualizar();
  new MutationObserver(actualizar).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-tema"],
  });

  document.querySelectorAll<HTMLElement>("[data-probar-tema]").forEach((boton) => {
    boton.addEventListener("click", () => alternarTema(boton));
  });
}
