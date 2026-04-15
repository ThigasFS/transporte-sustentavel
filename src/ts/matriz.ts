import type { Movimento } from "./types";

export type Problema = {
    custo: number[][];
    oferta: number[];
    demanda: number[];
};

export type Celula = {
    i: number;
    j: number;
};

function criarMatriz(linhas: number, colunas: number): number[][] {
    return Array.from({ length: linhas }, () => Array(colunas).fill(0));
}

export function cantoNoroeste(p: Problema) {
    const linhas = p.oferta.length;
    const colunas = p.demanda.length;

    const matriz = criarMatriz(linhas, colunas);

    const oferta = [...p.oferta];
    const demanda = [...p.demanda];

    const movimentos: Movimento[] = [];

    let i = 0;
    let j = 0;

    while (i < linhas && j < colunas) {
        const x = Math.min(oferta[i], demanda[j]);

        matriz[i][j] = x;

        movimentos.push({
            i,
            j,
            valor: x,
            ordem: ordem++
        });

        oferta[i] -= x;
        demanda[j] -= x;

        if (oferta[i] === 0 && demanda[j] === 0) {
            i++;
            j++;
        } else if (oferta[i] === 0) {
            i++;
        } else {
            j++;
        }
    }

    return {
        matriz,
        movimentos
    };
}

export function custoTotal(matriz: number[][], custo: number[][]): number {
    let total = 0;

    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            total += matriz[i][j] * custo[i][j];
        }
    }

    return total;
}