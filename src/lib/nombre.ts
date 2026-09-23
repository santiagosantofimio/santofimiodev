/*
  El nombre del hero cambia de grosor según la cercanía del puntero: las letras
  cerca del mouse se engrosan y las lejanas se adelgazan. En pantallas táctiles,
  un toque manda una onda desde el punto tocado. La fuente es variable, así que
  el grosor se interpola sin saltos.
*/

const PESO_BASE = 800;
const PESO_MIN = 380;
const PESO_MAX = 900;
const RADIO = 320;

export function iniciarNombre() {
  const zona = document.querySelector<HTMLElement>("[data-nombre]");
  if (!zona) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const letras = [...zona.querySelectorAll<HTMLElement>("[data-letra]")];
  const pesos = letras.map(() => PESO_BASE);
  let objetivos = letras.map(() => PESO_BASE);
  let centros: { x: number; y: number }[] = [];
  let animacion = 0;
  let regreso = 0;

  function medir() {
    centros = letras.map((letra) => {
      const caja = letra.getBoundingClientRect();
      return { x: caja.left + caja.width / 2 + scrollX, y: caja.top + caja.height / 2 + scrollY };
    });
  }

  function apuntar(x: number, y: number) {
    objetivos = centros.map((centro) => {
      const cercania = Math.max(0, 1 - Math.hypot(centro.x - x, centro.y - y) / RADIO);
      return PESO_MIN + (PESO_MAX - PESO_MIN) * cercania * cercania;
    });
    mover();
  }

  function soltar() {
    objetivos = letras.map(() => PESO_BASE);
    mover();
  }

  // Cada cuadro acerca el peso actual al objetivo un 18%: se siente con inercia, sin rebote.
  function paso() {
    let quieto = true;
    letras.forEach((letra, i) => {
      const diferencia = objetivos[i] - pesos[i];
      if (Math.abs(diferencia) > 0.5) {
        pesos[i] += diferencia * 0.18;
        quieto = false;
      } else {
        pesos[i] = objetivos[i];
      }
      letra.style.fontWeight = String(Math.round(pesos[i]));
    });
    animacion = quieto ? 0 : requestAnimationFrame(paso);
  }

  function mover() {
    if (!animacion) animacion = requestAnimationFrame(paso);
  }

  const conMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // La entrada del nombre corre por CSS; el efecto arranca cuando termina.
  const empezar = () => {
    medir();
    if (conMouse) {
      zona.addEventListener("pointermove", (evento) => apuntar(evento.pageX, evento.pageY));
      zona.addEventListener("pointerleave", soltar);
    } else {
      zona.addEventListener("pointerdown", (evento) => {
        apuntar(evento.pageX, evento.pageY);
        window.clearTimeout(regreso);
        regreso = window.setTimeout(soltar, 650);
      });
    }
  };

  document.fonts.ready.then(() => window.setTimeout(empezar, 1100));
  window.addEventListener("resize", medir, { passive: true });
}
