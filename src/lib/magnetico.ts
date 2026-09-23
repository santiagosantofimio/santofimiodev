/*
  Los botones con [data-magnetico] se corren un poco hacia el puntero cuando
  está encima. Usa la propiedad `translate`, independiente de `transform`, para
  no pisar la escala del :active.
*/
const FUERZA = 0.22;
const MAXIMO = 8;

export function iniciarMagnetico() {
  const puedeUsarse = window.matchMedia(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  ).matches;
  if (!puedeUsarse) return;

  document.querySelectorAll<HTMLElement>("[data-magnetico]").forEach((boton) => {
    boton.addEventListener("pointermove", (evento) => {
      const caja = boton.getBoundingClientRect();
      const limitar = (valor: number) => Math.max(-MAXIMO, Math.min(MAXIMO, valor));
      const x = limitar((evento.clientX - caja.left - caja.width / 2) * FUERZA);
      const y = limitar((evento.clientY - caja.top - caja.height / 2) * FUERZA);
      boton.style.translate = `${x}px ${y}px`;
    });
    boton.addEventListener("pointerleave", () => {
      boton.style.translate = "";
    });
  });
}
