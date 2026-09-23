/*
  Revela los elementos con [data-aparece] cuando entran en pantalla. Mientras
  dura un salto de ancla se ignoran las entradas, para que no se disparen de
  golpe todas las secciones que el salto atraviesa; al aterrizar se revela lo
  que quedó a la vista.
*/

let saltando = false;

function revelar(elemento: Element, observador: IntersectionObserver) {
  elemento.classList.add("visible");
  observador.unobserve(elemento);
}

function estaEnPantalla(elemento: Element) {
  const caja = elemento.getBoundingClientRect();
  return caja.top < window.innerHeight * 0.92 && caja.bottom > 0;
}

export function iniciarApariciones() {
  const elementos = document.querySelectorAll("[data-aparece]");
  if (elementos.length === 0) return;

  const observador = new IntersectionObserver(
    (entradas) => {
      if (saltando) return;
      for (const entrada of entradas) {
        if (entrada.isIntersecting) revelar(entrada.target, observador);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  elementos.forEach((elemento) => observador.observe(elemento));

  window.addEventListener("salto:inicio", () => {
    saltando = true;
  });

  window.addEventListener("salto:fin", () => {
    saltando = false;
    document.querySelectorAll("[data-aparece]:not(.visible)").forEach((elemento) => {
      if (estaEnPantalla(elemento)) revelar(elemento, observador);
    });
  });
}
