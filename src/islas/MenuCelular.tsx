import { useEffect, useId, useRef, useState } from "react";
import { ListIcon, WhatsappLogoIcon, XIcon } from "@phosphor-icons/react";

interface Enlace {
  href: string;
  texto: string;
}

interface Props {
  enlaces: Enlace[];
  whatsapp: string;
  textoWhatsapp: string;
}

export default function MenuCelular({ enlaces, whatsapp, textoWhatsapp }: Props) {
  const [abierto, setAbierto] = useState(false);
  const idPanel = useId();
  const boton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) return;

    function alTeclear(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        setAbierto(false);
        boton.current?.focus();
      }
    }

    function alTocarFuera(evento: PointerEvent) {
      const objetivo = evento.target as Node;
      if (!panel.current?.contains(objetivo) && !boton.current?.contains(objetivo)) setAbierto(false);
    }

    // Si la pantalla crece hasta mostrar la navegación completa, el menú sobra.
    const escritorio = window.matchMedia("(min-width: 1024px)");
    const alCrecer = () => escritorio.matches && setAbierto(false);

    document.addEventListener("keydown", alTeclear);
    document.addEventListener("pointerdown", alTocarFuera);
    escritorio.addEventListener("change", alCrecer);
    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.removeEventListener("pointerdown", alTocarFuera);
      escritorio.removeEventListener("change", alCrecer);
    };
  }, [abierto]);

  return (
    <>
      <button
        ref={boton}
        type="button"
        className="boton boton-icono"
        aria-expanded={abierto}
        aria-controls={idPanel}
        aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setAbierto((valor) => !valor)}
      >
        {abierto ? <XIcon size={22} weight="bold" aria-hidden /> : <ListIcon size={22} weight="bold" aria-hidden />}
      </button>

      <div
        ref={panel}
        id={idPanel}
        data-abierto={abierto}
        inert={!abierto}
        className="panel-menu absolute inset-x-0 top-full border-b border-linea bg-fondo px-margen pt-4 pb-8"
      >
        <nav aria-label="Menú">
          <ul className="flex flex-col">
            {enlaces.map((enlace) => (
              <li key={enlace.href}>
                <a
                  href={enlace.href}
                  onClick={() => setAbierto(false)}
                  className="block py-3 font-display text-titulo-3 font-semibold"
                >
                  {enlace.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener"
          onClick={() => setAbierto(false)}
          className="boton boton-primario mt-6 w-full"
        >
          <WhatsappLogoIcon size={20} weight="bold" aria-hidden />
          {textoWhatsapp}
        </a>
      </div>
    </>
  );
}
