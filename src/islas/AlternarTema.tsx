import { useRef, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { alternarTema, temaActual, type Tema } from "@/lib/tema";

function suscribir(avisar: () => void) {
  const observador = new MutationObserver(avisar);
  observador.observe(document.documentElement, { attributes: true, attributeFilter: ["data-tema"] });
  return () => observador.disconnect();
}

export default function AlternarTema() {
  // En el servidor se asume oscuro, que es el modo por defecto.
  const tema = useSyncExternalStore(suscribir, temaActual, () => "oscuro" as Tema);
  const boton = useRef<HTMLButtonElement>(null);
  const oscuro = tema === "oscuro";

  return (
    <button
      ref={boton}
      type="button"
      onClick={() => alternarTema(boton.current ?? undefined)}
      className="boton boton-icono alternar-tema"
      aria-label={oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <SunIcon size={20} aria-hidden className="icono-sol" />
      <MoonIcon size={20} aria-hidden className="icono-luna" />
    </button>
  );
}
