import { useRef, useState } from "react";
import {
  ArrowCounterClockwiseIcon,
  ArrowsClockwiseIcon,
  BrowserIcon,
  BrowsersIcon,
  CheckIcon,
  DotsThreeIcon,
  ForkKnifeIcon,
  ScissorsIcon,
  StethoscopeIcon,
  StorefrontIcon,
  WhatsappLogoIcon,
  WrenchIcon,
  type Icon,
} from "@phosphor-icons/react";
import { avisoEstimado, mantenimiento, preguntas, type Opcion, type Pregunta } from "@/datos/estimador";
import { formatoPesos, formatoSemanas } from "@/lib/formato";
import { enlaceWhatsApp, TEXTO_CTA_WHATSAPP } from "@/lib/whatsapp";

type Respuestas = Partial<Record<Pregunta["id"], string>>;

// Solo las dos primeras preguntas llevan icono: ayudan a reconocer la opción de un vistazo.
const iconos: Record<string, Icon> = {
  "una-pagina": BrowserIcon,
  "varias-secciones": BrowsersIcon,
  rediseno: ArrowsClockwiseIcon,
  belleza: ScissorsIcon,
  comida: ForkKnifeIcon,
  salud: StethoscopeIcon,
  tienda: StorefrontIcon,
  taller: WrenchIcon,
  otro: DotsThreeIcon,
};

function elegida(pregunta: Pregunta, respuestas: Respuestas): Opcion | undefined {
  return pregunta.opciones.find((opcion) => opcion.id === respuestas[pregunta.id]);
}

function calcular(respuestas: Respuestas) {
  const elegidas = preguntas.flatMap((pregunta) => {
    const opcion = elegida(pregunta, respuestas);
    return opcion ? [{ pregunta, opcion }] : [];
  });
  const base = elegidas.find(({ opcion }) => opcion.precio)?.opcion;
  const extra = elegidas.reduce((total, { opcion }) => total + (opcion.semanasExtra ?? 0), 0);
  const semanas = base?.semanas && { desde: base.semanas.desde + extra, hasta: base.semanas.hasta + extra };
  const notas = elegidas.flatMap(({ opcion }) => (opcion.nota ? [opcion.nota] : []));
  return { elegidas, precio: base?.precio, semanas, notas };
}

function mensaje({ elegidas, precio, semanas }: ReturnType<typeof calcular>): string | null {
  if (elegidas.length === 0) return null;
  const lineas = ["Hola Santiago, hice el cálculo en tu página."];
  for (const { pregunta, opcion } of elegidas) lineas.push(`- ${pregunta.resumen}: ${opcion.etiqueta}`);
  if (precio && semanas) {
    lineas.push(
      `Estimado: ${formatoPesos(precio.desde)} a ${formatoPesos(precio.hasta)}, entrega en ${formatoSemanas(semanas)}.`,
    );
  }
  lineas.push("¿Cuándo podemos hablar?");
  return lineas.join("\n");
}

export default function Estimador() {
  const [respuestas, setRespuestas] = useState<Respuestas>({});
  const resultado = calcular(respuestas);
  const { precio, semanas, notas } = resultado;
  const hayRespuestas = resultado.elegidas.length > 0;
  const texto = mensaje(resultado);
  const formulario = useRef<HTMLFormElement>(null);

  function reiniciar() {
    setRespuestas({});
    // El botón desaparece al reiniciar; el foco vuelve a la primera pregunta para no perderse.
    formulario.current?.querySelector<HTMLInputElement>("input[type=radio]")?.focus();
  }

  function responder(pregunta: Pregunta["id"], opcion: string) {
    setRespuestas((actuales) => ({ ...actuales, [pregunta]: opcion }));
  }

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-12">
      <div className="col-span-12 lg:col-span-7">
        <form
          ref={formulario}
          className="flex flex-col gap-10"
          onSubmit={(evento) => evento.preventDefault()}
        >
          {preguntas.map((pregunta) => (
            <fieldset key={pregunta.id}>
              <legend className="font-display text-titulo-3 font-bold">{pregunta.pregunta}</legend>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {pregunta.opciones.map((opcion) => {
                  const Icono = iconos[opcion.id];
                  return (
                    <label key={opcion.id} className="opcion">
                      <input
                        type="radio"
                        name={pregunta.id}
                        value={opcion.id}
                        checked={respuestas[pregunta.id] === opcion.id}
                        onChange={() => responder(pregunta.id, opcion.id)}
                        className="sr-only"
                      />
                      <span className="flex items-center gap-3">
                        {Icono && (
                          <Icono size={20} weight="bold" aria-hidden className="shrink-0 text-texto-suave" />
                        )}
                        {opcion.etiqueta}
                      </span>
                      <CheckIcon size={18} weight="bold" aria-hidden className="opcion-marca" />
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </form>

        {precio && (
          <div className="barra-estimado sticky bottom-0 z-20 -mx-margen mt-10 flex items-center justify-between gap-4 border-t border-linea bg-fondo px-margen pt-1 pb-[calc(0.25rem+env(safe-area-inset-bottom))] lg:hidden">
            <p className="font-display font-bold">
              {formatoPesos(precio.desde)} <span className="font-normal text-texto-suave">a</span>{" "}
              {formatoPesos(precio.hasta)}
            </p>
            <a
              href="#resumen"
              className="enlace inline-flex min-h-11 items-center text-pequeno whitespace-nowrap"
            >
              Ver resumen
            </a>
          </div>
        )}
      </div>

      <div className="col-span-12 lg:col-span-5">
        <div
          id="resumen"
          tabIndex={-1}
          className="scroll-mt-20 rounded-base bg-superficie p-6 md:p-8 lg:sticky lg:top-24"
        >
          <h3 className="font-mono text-etiqueta text-texto-suave">Tu estimado</h3>
          <div aria-live="polite" className="mt-4">
            {precio && semanas ? (
              <>
                <p
                  key={`${precio.desde}-${precio.hasta}`}
                  className="cambio font-display text-titulo-2 font-extrabold"
                >
                  <span className="block">{formatoPesos(precio.desde)}</span>
                  <span className="block">
                    <span className="font-bold text-texto-suave">a </span>
                    {formatoPesos(precio.hasta)}
                  </span>
                </p>
                <p key={formatoSemanas(semanas)} className="cambio mt-4 text-entrada">
                  Entrega en {formatoSemanas(semanas)}.
                </p>
              </>
            ) : (
              <p className="max-w-[24ch] font-display text-titulo-3 font-bold text-texto-suave">
                Elige qué necesitas y aquí aparece el rango.
              </p>
            )}
          </div>

          {notas.length > 0 && (
            <ul className="mt-6 flex flex-col gap-2 text-pequeno">
              {notas.map((nota) => (
                <li key={nota}>{nota}</li>
              ))}
            </ul>
          )}

          <p className="mt-6 border-t border-linea pt-5 text-pequeno text-texto-suave">
            {avisoEstimado} {mantenimiento}
          </p>

          <a
            href={texto ? enlaceWhatsApp({ texto }) : enlaceWhatsApp("general")}
            target="_blank"
            rel="noopener"
            className="boton boton-primario mt-6 w-full"
          >
            <WhatsappLogoIcon size={20} weight="bold" aria-hidden />
            {TEXTO_CTA_WHATSAPP}
          </a>
          {hayRespuestas && (
            <button
              type="button"
              onClick={reiniciar}
              className="mt-2 inline-flex min-h-11 items-center gap-2 text-pequeno text-texto-suave transition-[color] duration-(--duracion-media) ease-salida hover:text-texto"
            >
              <ArrowCounterClockwiseIcon size={16} weight="bold" aria-hidden />
              Empezar de nuevo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
