/*
  Brillo que sigue al puntero sobre las tarjetas con [data-luz]. Solo con mouse
  y sin reducción de movimiento; escribe la posición en variables locales de la
  tarjeta, que es lo único que se recalcula.
*/
export function iniciarLuz() {
  const puedeUsarse = window.matchMedia(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  ).matches;
  if (!puedeUsarse) return;

  document.querySelectorAll<HTMLElement>("[data-luz]").forEach((tarjeta) => {
    tarjeta.addEventListener("pointermove", (evento) => {
      const caja = tarjeta.getBoundingClientRect();
      tarjeta.style.setProperty("--luz-x", `${evento.clientX - caja.left}px`);
      tarjeta.style.setProperty("--luz-y", `${evento.clientY - caja.top}px`);
    });
  });
}
