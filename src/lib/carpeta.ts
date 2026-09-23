/*
  La carpeta de "Sobre mí". Un clic o toque en cualquier parte la deja abierta o
  cerrada; con teclado, Enter y espacio llegan como clic desde el botón. Pasar
  el mouse la abre solo mientras está encima, y eso lo resuelve el CSS.
*/
export function iniciarCarpeta() {
  document.querySelectorAll<HTMLElement>("[data-carpeta]").forEach((carpeta) => {
    const boton = carpeta.querySelector<HTMLButtonElement>("button");

    carpeta.addEventListener("click", () => {
      // Si la persona está seleccionando texto de la hoja, no se cierra.
      const seleccion = window.getSelection();
      if (seleccion && !seleccion.isCollapsed && carpeta.contains(seleccion.anchorNode)) return;

      const abierta = carpeta.dataset.abierta !== "true";
      carpeta.dataset.abierta = String(abierta);
      boton?.setAttribute("aria-expanded", String(abierta));
    });
  });
}
