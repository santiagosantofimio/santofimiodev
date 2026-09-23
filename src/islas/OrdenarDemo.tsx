import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowsClockwiseIcon, PlayIcon, StopIcon } from "@phosphor-icons/react";
import { nombres, pasos, type Algoritmo, type Paso } from "@/lib/ordenamiento";

// Punto de partida fijo, igual en el servidor y en el navegador. "Mezclar" lo cambia.
const INICIAL = [14, 5, 19, 9, 2, 17, 11, 7, 20, 3, 13, 16, 1, 10, 18, 6, 12, 4, 15, 8];
const MAXIMO = INICIAL.length;

type Estado = "quieto" | "ordenando" | "listo";

function mezclar(valores: number[]) {
  const copia = [...valores];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export default function OrdenarDemo() {
  const [algoritmo, setAlgoritmo] = useState<Algoritmo>("quick");
  const [estado, setEstado] = useState<Estado>("quieto");
  const [mensaje, setMensaje] = useState("");
  const valores = useRef([...INICIAL]);
  const barras = useRef<(HTMLSpanElement | null)[]>([]);
  const animacion = useRef(0);

  useEffect(() => () => cancelAnimationFrame(animacion.current), []);

  function pintar(indice: number, valor: number) {
    const barra = barras.current[indice];
    if (barra) barra.style.transform = `scaleY(${valor / MAXIMO})`;
  }

  function marcar(activos: number[]) {
    barras.current.forEach((barra, indice) => {
      if (barra) barra.dataset.activo = String(activos.includes(indice));
    });
  }

  function detener() {
    cancelAnimationFrame(animacion.current);
    marcar([]);
    setEstado("quieto");
    setMensaje("Detenido.");
  }

  function ordenar() {
    const recorrido = pasos(algoritmo, valores.current);
    let comparaciones = 0;
    let escrituras = 0;

    const aplicar = (paso: Paso) => {
      if (paso.tipo === "comparar") {
        comparaciones++;
        marcar([paso.i, paso.j]);
      } else {
        escrituras++;
        valores.current[paso.i] = paso.valor;
        pintar(paso.i, paso.valor);
      }
    };

    const terminar = () => {
      marcar([]);
      setEstado("listo");
      setMensaje(`${nombres[algoritmo]}: ${comparaciones} comparaciones y ${escrituras} escrituras.`);
    };

    setEstado("ordenando");
    setMensaje(`Ordenando con ${nombres[algoritmo]}.`);

    // Con movimiento reducido se muestra el resultado sin la animación.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (const paso of recorrido) aplicar(paso);
      terminar();
      return;
    }

    const cuadro = () => {
      const siguiente = recorrido.next();
      if (siguiente.done) {
        terminar();
        return;
      }
      aplicar(siguiente.value);
      animacion.current = requestAnimationFrame(cuadro);
    };
    animacion.current = requestAnimationFrame(cuadro);
  }

  function reiniciar() {
    cancelAnimationFrame(animacion.current);
    valores.current = mezclar(valores.current);
    valores.current.forEach((valor, indice) => pintar(indice, valor));
    marcar([]);
    setEstado("quieto");
    setMensaje("");
  }

  const ordenando = estado === "ordenando";

  return (
    <div className="demo-orden" data-estado={estado}>
      <div aria-hidden className="flex h-40 items-end gap-[3px] sm:h-48">
        {INICIAL.map((valor, indice) => (
          <span
            key={indice}
            ref={(elemento) => {
              barras.current[indice] = elemento;
            }}
            className="barra-orden"
            style={{ transform: `scaleY(${valor / MAXIMO})`, "--i": indice } as CSSProperties}
          />
        ))}
      </div>

      <fieldset className="mt-5" disabled={ordenando}>
        <legend className="sr-only">Algoritmo</legend>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(nombres) as Algoritmo[]).map((clave) => (
            <label key={clave} className="chip">
              <input
                type="radio"
                name="algoritmo"
                value={clave}
                checked={algoritmo === clave}
                onChange={() => setAlgoritmo(clave)}
                className="sr-only"
              />
              {nombres[clave]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button type="button" className="boton boton-primario boton-compacto" onClick={ordenando ? detener : ordenar}>
          {ordenando ? <StopIcon size={16} aria-hidden /> : <PlayIcon size={16} aria-hidden />}
          {ordenando ? "Detener" : "Ordenar"}
        </button>
        <button type="button" className="boton boton-secundario boton-compacto" onClick={reiniciar}>
          <ArrowsClockwiseIcon size={16} aria-hidden />
          Mezclar
        </button>
        <p aria-live="polite" className="text-pequeno text-texto-suave sm:ml-2">
          {mensaje}
        </p>
      </div>
    </div>
  );
}
