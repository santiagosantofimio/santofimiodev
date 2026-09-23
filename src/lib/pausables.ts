/*
  Las animaciones que se repiten (la pantalla del hero, la cinta del stack) solo
  corren mientras su bloque está a la vista. Fuera de pantalla quedan en pausa.
*/
export function iniciarPausables() {
  const bloques = document.querySelectorAll("[data-pausable]");
  if (bloques.length === 0) return;

  const observador = new IntersectionObserver((entradas) => {
    for (const entrada of entradas) entrada.target.classList.toggle("en-pantalla", entrada.isIntersecting);
  });

  bloques.forEach((bloque) => observador.observe(bloque));
}
