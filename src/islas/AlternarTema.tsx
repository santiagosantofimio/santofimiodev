import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";

type Tema = "oscuro" | "claro";

const raiz = () => document.documentElement;

function suscribir(avisar: () => void) {
  const observador = new MutationObserver(avisar);
  observador.observe(raiz(), { attributes: true, attributeFilter: ["data-tema"] });
  return () => observador.disconnect();
}

const temaActual = (): Tema => (raiz().dataset.tema === "claro" ? "claro" : "oscuro");

export default function AlternarTema() {
  // En el servidor se asume oscuro, que es el modo por defecto.
  const tema = useSyncExternalStore(suscribir, temaActual, () => "oscuro" as Tema);
  const siguiente: Tema = tema === "oscuro" ? "claro" : "oscuro";

  function cambiar() {
    const html = raiz();
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducido) {
      html.classList.add("cambiando-tema");
      window.setTimeout(() => html.classList.remove("cambiando-tema"), 400);
    }
    if (siguiente === "claro") {
      html.dataset.tema = "claro";
    } else {
      delete html.dataset.tema;
    }
    try {
      localStorage.setItem("tema", siguiente);
    } catch {
      // Sin almacenamiento (modo privado estricto) el cambio dura lo que dure la visita.
    }
  }

  return (
    <button
      type="button"
      onClick={cambiar}
      className="boton boton-icono"
      aria-label={siguiente === "claro" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {tema === "oscuro" ? <SunIcon size={20} weight="bold" aria-hidden /> : <MoonIcon size={20} weight="bold" aria-hidden />}
    </button>
  );
}
