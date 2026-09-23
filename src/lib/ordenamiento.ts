/*
  Los cinco algoritmos de SortingVisualizer, reescritos como generadores que
  van soltando cada paso. La demo de la página los reproduce uno por cuadro.
*/

export type Paso = { tipo: "comparar"; i: number; j: number } | { tipo: "escribir"; i: number; valor: number };

export type Algoritmo = "burbuja" | "insercion" | "seleccion" | "merge" | "quick";

export const nombres: Record<Algoritmo, string> = {
  burbuja: "Bubble Sort",
  insercion: "Insertion Sort",
  seleccion: "Selection Sort",
  merge: "Merge Sort",
  quick: "Quick Sort",
};

function* intercambiar(a: number[], i: number, j: number): Generator<Paso> {
  [a[i], a[j]] = [a[j], a[i]];
  yield { tipo: "escribir", i, valor: a[i] };
  yield { tipo: "escribir", i: j, valor: a[j] };
}

function* burbuja(a: number[]): Generator<Paso> {
  for (let fin = a.length - 1; fin > 0; fin--) {
    for (let j = 0; j < fin; j++) {
      yield { tipo: "comparar", i: j, j: j + 1 };
      if (a[j] > a[j + 1]) yield* intercambiar(a, j, j + 1);
    }
  }
}

function* insercion(a: number[]): Generator<Paso> {
  for (let i = 1; i < a.length; i++) {
    let j = i;
    while (j > 0) {
      yield { tipo: "comparar", i: j - 1, j };
      if (a[j - 1] <= a[j]) break;
      yield* intercambiar(a, j - 1, j);
      j--;
    }
  }
}

function* seleccion(a: number[]): Generator<Paso> {
  for (let i = 0; i < a.length - 1; i++) {
    let menor = i;
    for (let j = i + 1; j < a.length; j++) {
      yield { tipo: "comparar", i: menor, j };
      if (a[j] < a[menor]) menor = j;
    }
    if (menor !== i) yield* intercambiar(a, i, menor);
  }
}

function* merge(a: number[], inicio = 0, fin = a.length): Generator<Paso> {
  if (fin - inicio < 2) return;
  const medio = Math.floor((inicio + fin) / 2);
  yield* merge(a, inicio, medio);
  yield* merge(a, medio, fin);

  const izquierda = a.slice(inicio, medio);
  const derecha = a.slice(medio, fin);
  let i = 0;
  let j = 0;
  for (let k = inicio; k < fin; k++) {
    if (i < izquierda.length && j < derecha.length) yield { tipo: "comparar", i: inicio + i, j: medio + j };
    const tomarIzquierda = j >= derecha.length || (i < izquierda.length && izquierda[i] <= derecha[j]);
    a[k] = tomarIzquierda ? izquierda[i++] : derecha[j++];
    yield { tipo: "escribir", i: k, valor: a[k] };
  }
}

function* quick(a: number[], inicio = 0, fin = a.length - 1): Generator<Paso> {
  if (inicio >= fin) return;
  const pivote = a[fin];
  let borde = inicio;
  for (let j = inicio; j < fin; j++) {
    yield { tipo: "comparar", i: j, j: fin };
    if (a[j] < pivote) {
      if (borde !== j) yield* intercambiar(a, borde, j);
      borde++;
    }
  }
  if (borde !== fin) yield* intercambiar(a, borde, fin);
  yield* quick(a, inicio, borde - 1);
  yield* quick(a, borde + 1, fin);
}

const generadores: Record<Algoritmo, (a: number[]) => Generator<Paso>> = {
  burbuja,
  insercion,
  seleccion,
  merge: (a) => merge(a),
  quick: (a) => quick(a),
};

export function pasos(algoritmo: Algoritmo, valores: number[]): Generator<Paso> {
  return generadores[algoritmo]([...valores]);
}
