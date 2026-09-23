/*
  Tarjetas vivas, solo con mouse y sin movimiento reducido:
  - [data-luz]: un brillo que sigue al puntero (variables locales de la tarjeta).
  - [data-inclinar]: la tarjeta se inclina apenas hacia el puntero, en 3D.
*/
const INCLINACION = 2.5;

export function iniciarLuz() {
  const puedeUsarse = window.matchMedia(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  ).matches;
  if (!puedeUsarse) return;

  document.querySelectorAll<HTMLElement>("[data-luz]").forEach((tarjeta) => {
    const inclinar = tarjeta.hasAttribute("data-inclinar");

    tarjeta.addEventListener("pointermove", (evento) => {
      const caja = tarjeta.getBoundingClientRect();
      const x = evento.clientX - caja.left;
      const y = evento.clientY - caja.top;
      tarjeta.style.setProperty("--luz-x", `${x}px`);
      tarjeta.style.setProperty("--luz-y", `${y}px`);

      if (inclinar) {
        const rotY = (x / caja.width - 0.5) * 2 * INCLINACION;
        const rotX = (0.5 - y / caja.height) * 2 * INCLINACION;
        tarjeta.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(0, -3px, 0)`;
      }
    });

    if (inclinar) {
      tarjeta.addEventListener("pointerleave", () => {
        tarjeta.style.transform = "";
      });
    }
  });
}
