import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

interface Enlace {
  href: string;
  texto: string;
}

interface Props {
  enlaces: Enlace[];
  correo: string;
  textoCorreo: string;
}

export default function MenuCelular({ enlaces, correo, textoCorreo }: Props) {
  const [abierto, setAbierto] = useState(false);
  const idPanel = useId();
  const boton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const fondo = [document.querySelector("main"), document.querySelector("footer")];
    // Con el menú abierto, la página de atrás no se desplaza ni recibe el foco.
    html.classList.toggle("menu-abierto", abierto);
    fondo.forEach((elemento) => {
      if (elemento) elemento.inert = abierto;
    });
    if (!abierto) return;

    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });

    function alTeclear(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        setAbierto(false);
        boton.current?.focus();
      }
    }

    const escritorio = window.matchMedia("(min-width: 1024px)");
    const alCrecer = () => escritorio.matches && setAbierto(false);

    document.addEventListener("keydown", alTeclear);
    escritorio.addEventListener("change", alCrecer);
    return () => {
      document.removeEventListener("keydown", alTeclear);
      escritorio.removeEventListener("change", alCrecer);
    };
  }, [abierto]);

  return (
    <>
      <button
        ref={boton}
        type="button"
        className="boton boton-icono hamburguesa"
        data-abierto={abierto}
        aria-expanded={abierto}
        aria-controls={idPanel}
        aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setAbierto((valor) => !valor)}
      >
        <span aria-hidden className="hamburguesa-linea" />
        <span aria-hidden className="hamburguesa-linea" />
      </button>

      <div
        ref={panel}
        id={idPanel}
        data-abierto={abierto}
        inert={!abierto}
        className="panel-menu fixed inset-x-0 top-16 bottom-0 flex flex-col justify-between bg-fondo px-margen pt-8 pb-[calc(2rem+env(safe-area-inset-bottom))]"
      >
        <nav aria-label="Menú">
          <ul className="flex flex-col">
            {enlaces.map((enlace, indice) => (
              <li key={enlace.href} className="menu-item" style={{ "--i": indice } as CSSProperties}>
                <a
                  href={enlace.href}
                  onClick={() => setAbierto(false)}
                  className="block border-b border-linea py-4 font-display text-titulo-2 font-extrabold"
                >
                  {enlace.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={`mailto:${correo}`}
          onClick={() => setAbierto(false)}
          className="menu-item boton boton-primario w-full"
          style={{ "--i": enlaces.length } as CSSProperties}
        >
          {textoCorreo}
        </a>
      </div>
    </>
  );
}
