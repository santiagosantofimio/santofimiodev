/*
  Scroll suave para los enlaces internos (#seccion). La duración crece con la
  distancia entre 600 y 1400 ms y usa easeOutCubic. Avisa con los eventos
  salto:inicio y salto:fin para que las apariciones se congelen durante el salto.
*/

const DURACION_MIN = 600;
const DURACION_MAX = 1400;

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

let animacion = 0;

function detener() {
  if (animacion) cancelAnimationFrame(animacion);
  animacion = 0;
  window.removeEventListener("wheel", detener);
  window.removeEventListener("touchstart", detener);
  window.dispatchEvent(new Event("salto:fin"));
}

function destinoDe(objetivo: HTMLElement) {
  const margen = parseFloat(getComputedStyle(objetivo).scrollMarginTop) || 0;
  const maximo = document.documentElement.scrollHeight - window.innerHeight;
  const destino = objetivo.getBoundingClientRect().top + window.scrollY - margen;
  return Math.min(Math.max(destino, 0), maximo);
}

function saltarA(objetivo: HTMLElement) {
  if (animacion) detener();

  const inicio = window.scrollY;
  const distancia = destinoDe(objetivo) - inicio;
  const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducido || Math.abs(distancia) < 2) {
    window.scrollTo(0, inicio + distancia);
    window.dispatchEvent(new Event("salto:fin"));
    return;
  }

  const duracion = Math.min(DURACION_MAX, Math.max(DURACION_MIN, Math.abs(distancia) * 0.45));
  let comienzo: number | null = null;

  window.dispatchEvent(new Event("salto:inicio"));
  // Si la persona mueve la rueda o toca la pantalla, el salto cede el control.
  window.addEventListener("wheel", detener, { passive: true });
  window.addEventListener("touchstart", detener, { passive: true });

  const paso = (ahora: number) => {
    comienzo ??= ahora;
    const progreso = Math.min((ahora - comienzo) / duracion, 1);
    window.scrollTo(0, inicio + distancia * easeOutCubic(progreso));
    if (progreso < 1) {
      animacion = requestAnimationFrame(paso);
    } else {
      detener();
    }
  };

  animacion = requestAnimationFrame(paso);
}

export function iniciarDesplazamiento() {
  document.addEventListener("click", (evento) => {
    if (evento.defaultPrevented || evento.button !== 0) return;
    if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return;

    const enlace = (evento.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!enlace) return;

    const id = decodeURIComponent(enlace.hash.slice(1));
    const objetivo = id ? document.getElementById(id) : document.body;
    if (!objetivo) return;

    evento.preventDefault();
    saltarA(objetivo);
    history.pushState(null, "", id ? `#${id}` : location.pathname);
    // El foco viaja con el salto, para quien navega con teclado o lector de pantalla.
    if (id) objetivo.focus({ preventScroll: true });
  });
}
