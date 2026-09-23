/*
  La credencial del hero cuelga de una cinta como un péndulo: se puede agarrar
  y soltar, y vuelve al centro oscilando con un resorte amortiguado. Con el
  mouse encima se inclina en 3D y un brillo sigue al puntero.
*/

const RIGIDEZ = 0.016;
const AMORTIGUACION = 0.04;
const ANGULO_MAXIMO = 38;
const INCLINACION = 8;

export function iniciarCredencial() {
  const escena = document.querySelector<HTMLElement>("[data-credencial]");
  const pendulo = escena?.querySelector<HTMLElement>("[data-pendulo]");
  const tarjeta = escena?.querySelector<HTMLElement>("[data-tarjeta]");
  if (!escena || !pendulo || !tarjeta) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let angulo = 0;
  let velocidad = 0;
  let arrastrando = false;
  let animacion = 0;
  let anguloAlAgarrar = 0;
  let punteroAlAgarrar = 0;

  const pintar = () => {
    pendulo.style.transform = `rotate(${angulo}deg)`;
  };

  // Ángulo del puntero respecto al punto del que cuelga la cinta, en grados.
  const anguloDelPuntero = (x: number, y: number) => {
    const caja = escena.getBoundingClientRect();
    const dx = x - (caja.left + caja.width / 2);
    const dy = Math.max(y - caja.top, 1);
    return (-Math.atan2(dx, dy) * 180) / Math.PI;
  };

  function paso() {
    if (!arrastrando) {
      velocidad += -RIGIDEZ * angulo - AMORTIGUACION * velocidad;
      angulo += velocidad;
    }
    pintar();
    const quieto = !arrastrando && Math.abs(angulo) < 0.02 && Math.abs(velocidad) < 0.02;
    if (quieto) {
      angulo = 0;
      velocidad = 0;
      pintar();
      animacion = 0;
      escena!.classList.remove("moviendo");
      return;
    }
    animacion = requestAnimationFrame(paso);
  }

  function mover() {
    escena!.classList.add("moviendo");
    if (!animacion) animacion = requestAnimationFrame(paso);
  }

  tarjeta.addEventListener("pointerdown", (evento) => {
    arrastrando = true;
    anguloAlAgarrar = angulo;
    punteroAlAgarrar = anguloDelPuntero(evento.clientX, evento.clientY);
    tarjeta.setPointerCapture(evento.pointerId);
    tarjeta.style.transform = "";
    mover();
  });

  tarjeta.addEventListener("pointermove", (evento) => {
    if (arrastrando) {
      const siguiente = anguloAlAgarrar + anguloDelPuntero(evento.clientX, evento.clientY) - punteroAlAgarrar;
      const limitado = Math.max(-ANGULO_MAXIMO, Math.min(ANGULO_MAXIMO, siguiente));
      velocidad = limitado - angulo;
      angulo = limitado;
      return;
    }

    if (evento.pointerType !== "mouse") return;
    const caja = tarjeta.getBoundingClientRect();
    const x = (evento.clientX - caja.left) / caja.width;
    const y = (evento.clientY - caja.top) / caja.height;
    tarjeta.style.setProperty("--luz-x", `${x * 100}%`);
    tarjeta.style.setProperty("--luz-y", `${y * 100}%`);
    tarjeta.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 2 * INCLINACION}deg) rotateY(${(x - 0.5) * 2 * INCLINACION}deg)`;
  });

  const soltar = () => {
    if (!arrastrando) return;
    arrastrando = false;
    mover();
  };
  tarjeta.addEventListener("pointerup", soltar);
  tarjeta.addEventListener("pointercancel", soltar);

  // Al entrar el mouse, un empujoncito hacia el lado contrario, como si lo rozara.
  tarjeta.addEventListener("pointerenter", (evento) => {
    if (evento.pointerType !== "mouse" || arrastrando) return;
    const caja = tarjeta.getBoundingClientRect();
    velocidad += evento.clientX < caja.left + caja.width / 2 ? -0.35 : 0.35;
    mover();
  });

  tarjeta.addEventListener("pointerleave", () => {
    tarjeta.style.transform = "";
  });

  // Entra ladeada y se suelta sola, balanceándose hasta quedar quieta.
  angulo = 14;
  pintar();
  window.setTimeout(mover, 450);
}
