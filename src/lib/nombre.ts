/*
  El nombre del hero cambia de grosor y de ancho según la cercanía del puntero:
  las letras cerca del mouse se engrosan y se ensanchan, las lejanas se
  adelgazan y se estrechan. En pantallas táctiles, un toque manda una onda desde
  el punto tocado. Mona Sans es variable en los dos ejes, así que todo se
  interpola sin saltos.
*/

const PESO_BASE = 800;
const PESO_MIN = 320;
const PESO_MAX = 900;
const ANCHO_BASE = 112.5;
const ANCHO_MIN = 80;
const ANCHO_MAX = 125;
const RADIO = 320;

export function iniciarNombre() {
  const zona = document.querySelector<HTMLElement>("[data-nombre]");
  if (!zona) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const letras = [...zona.querySelectorAll<HTMLElement>("[data-letra]")];
  // Un solo valor por letra, de 0 (lejos) a 1 (encima); peso y ancho salen de ahí.
  const reposo = (PESO_BASE - PESO_MIN) / (PESO_MAX - PESO_MIN);
  const cercanias = letras.map(() => reposo);
  let objetivos = letras.map(() => reposo);
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
      return cercania * cercania;
    });
    mover();
  }

  function soltar() {
    objetivos = letras.map(() => reposo);
    mover();
  }

  // Cada cuadro acerca el valor actual al objetivo un 18%: se siente con inercia, sin rebote.
  function paso() {
    let quieto = true;
    letras.forEach((letra, i) => {
      const diferencia = objetivos[i] - cercanias[i];
      if (Math.abs(diferencia) > 0.002) {
        cercanias[i] += diferencia * 0.18;
        quieto = false;
      } else {
        cercanias[i] = objetivos[i];
      }
      const valor = cercanias[i];
      const ancho = valor <= reposo
        ? ANCHO_MIN + ((ANCHO_BASE - ANCHO_MIN) * valor) / reposo
        : ANCHO_BASE + ((ANCHO_MAX - ANCHO_BASE) * (valor - reposo)) / (1 - reposo);
      letra.style.fontWeight = String(Math.round(PESO_MIN + (PESO_MAX - PESO_MIN) * valor));
      letra.style.fontStretch = `${ancho.toFixed(1)}%`;
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
