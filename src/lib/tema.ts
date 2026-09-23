/*
  Cambio de tema. Donde el navegador tiene View Transitions, el tema nuevo se
  revela en un círculo que crece desde el botón que se tocó; donde no, los
  colores cambian con una transición corta. Con movimiento reducido, en seco.
*/

export type Tema = "oscuro" | "claro";

export const temaActual = (): Tema =>
  document.documentElement.dataset.tema === "claro" ? "claro" : "oscuro";

function aplicar(tema: Tema) {
  const html = document.documentElement;
  if (tema === "claro") html.dataset.tema = "claro";
  else delete html.dataset.tema;

  const fondo = getComputedStyle(html).getPropertyValue("--fondo").trim();
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", fondo);
  try {
    localStorage.setItem("tema", tema);
  } catch {
    // Sin almacenamiento, el cambio dura lo que dure la visita.
  }
}

export function alternarTema(origen?: HTMLElement) {
  const siguiente: Tema = temaActual() === "oscuro" ? "claro" : "oscuro";
  const html = document.documentElement;
  const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducido) {
    aplicar(siguiente);
    return;
  }

  if (!document.startViewTransition || !origen) {
    html.classList.add("cambiando-tema");
    aplicar(siguiente);
    window.setTimeout(() => html.classList.remove("cambiando-tema"), 400);
    return;
  }

  const caja = origen.getBoundingClientRect();
  const x = caja.left + caja.width / 2;
  const y = caja.top + caja.height / 2;
  const radio = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  const transicion = document.startViewTransition(() => aplicar(siguiente));
  transicion.ready.then(() => {
    html.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radio}px at ${x}px ${y}px)`] },
      { duration: 560, easing: "cubic-bezier(0.77, 0, 0.175, 1)", pseudoElement: "::view-transition-new(root)" },
    );
  });
}
