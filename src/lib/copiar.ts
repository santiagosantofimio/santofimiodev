/*
  Botón para copiar el correo. Confirma con "Copiado" durante dos segundos y
  lo anuncia a los lectores de pantalla; si el portapapeles no está
  disponible, abre el correo.
*/
export function iniciarCopiar() {
  const aviso = document.querySelector("[data-copiar-aviso]");

  document.querySelectorAll<HTMLButtonElement>("[data-copiar]").forEach((boton) => {
    const valor = boton.dataset.copiar ?? "";
    let espera = 0;

    boton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(valor);
      } catch {
        window.location.href = `mailto:${valor}`;
        return;
      }
      boton.dataset.copiado = "true";
      if (aviso) aviso.textContent = boton.dataset.aviso ?? "";
      window.clearTimeout(espera);
      espera = window.setTimeout(() => {
        delete boton.dataset.copiado;
        if (aviso) aviso.textContent = "";
      }, 2000);
    });
  });
}
