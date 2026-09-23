const pesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

/** "$ 700.000" pasa a "$700.000": Intl deja un espacio duro después del signo. */
export function formatoPesos(valor: number): string {
  return pesos.format(valor).replace(/\s/g, "");
}

export function formatoSemanas({ desde, hasta }: { desde: number; hasta: number }): string {
  if (desde === hasta) return desde === 1 ? "1 semana" : `${desde} semanas`;
  return `${desde} a ${hasta} semanas`;
}
