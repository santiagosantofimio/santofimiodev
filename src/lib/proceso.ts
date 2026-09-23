/*
  En "Cómo trabajo", cada paso se enciende cuando llega a la mitad de la
  pantalla. El tramo de línea que lleva a un paso se llena cuando ese paso se
  enciende (lo resuelve el CSS con :has).
*/
export function iniciarProceso() {
  const pasos = document.querySelectorAll<HTMLElement>("[data-paso]");
  if (pasos.length === 0) return;

  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        (entrada.target as HTMLElement).dataset.activo = "true";
        observador.unobserve(entrada.target);
      }
    },
    { rootMargin: "0px 0px -45% 0px" },
  );

  pasos.forEach((paso) => observador.observe(paso));
}
