type Problema = {
    custo: number[][];
    oferta: number[];
    demanda: number[];
};

function criarMatriz(linhas: number, colunas: number) {
    return Array.from({ length: linhas }, () => Array(colunas).fill(0));
}

type Celula = {
    i: number;
    j: number;
};

function cantoNoroeste(p: Problema) {
    const linhas = p.oferta.length;
    const colunas = p.demanda.length;

    const matriz = criarMatriz(linhas, colunas);

    const oferta = [...p.oferta];
    const demanda = [...p.demanda];

    let i = 0;
    let j = 0;

    while (i < linhas && j < colunas) {
        const x = Math.min(oferta[i], demanda[j]);

        matriz[i][j] = x;

        oferta[i] -= x;
        demanda[j] -= x;

        if (oferta[i] === 0) i++;
        else j++;
    }

    return matriz;
}

function custoTotal(matriz: number[][], custo: number[][]) {
    let total = 0;

    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            total += matriz[i][j] * custo[i][j];
        }
    }

    return total;
}

function modi(matriz: number[][], custo: number[][]) {
    const linhas = matriz.length;
    const colunas = matriz[0].length;

    const basicas: Celula[] = [];
    const naoBasicas: Celula[] = [];

    for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
            if (matriz[i][j] > 0) basicas.push({ i, j });
            else naoBasicas.push({ i, j });
        }
    }

    const u = new Array(linhas).fill(null);
    const v = new Array(colunas).fill(null);

    u[0] = 0;

    let alterou = true;

    while (alterou) {
        alterou = false;

        for (const { i, j } of basicas) {
            if (u[i] !== null && v[j] === null) {
                v[j] = custo[i][j] - u[i];
                alterou = true;
            } else if (v[j] !== null && u[i] === null) {
                u[i] = custo[i][j] - v[j];
                alterou = true;
            }
        }
    }

    const deltas = criarMatriz(linhas, colunas);

    let menor = { valor: Infinity, i: -1, j: -1 };

    for (const { i, j } of naoBasicas) {
        const delta = custo[i][j] - (u[i] + v[j]);
        deltas[i][j] = delta;

        if (delta < menor.valor) {
            menor = { valor: delta, i, j };
        }
    }

    return { u, v, deltas, menor };
}

function cicloSimples(matriz: number[][], start: Celula): Celula[] {
    const { i, j } = start;

    for (let col = 0; col < matriz[0].length; col++) {
        if (col !== j && matriz[i][col] > 0) {
            for (let row = 0; row < matriz.length; row++) {
                if (row !== i && matriz[row][col] > 0 && matriz[row][j] > 0) {
                    return [
                        { i, j },
                        { i, j: col },
                        { i: row, j: col },
                        { i: row, j }
                    ];
                }
            }
        }
    }

    return [];
}

function cicloFallback(start: Celula): Celula[] {
    return [
        { i: start.i, j: start.j },
        { i: start.i, j: 1 },
        { i: 0, j: 1 },
        { i: 0, j: start.j }
    ];
}

function ajustarCiclo(matriz: number[][], ciclo: Celula[]) {
    const nova = matriz.map(l => [...l]);

    const negativos = ciclo.filter((_, idx) => idx % 2 === 1);

    const teta = Math.min(...negativos.map(p => nova[p.i][p.j]));

    ciclo.forEach((p, idx) => {
        if (idx % 2 === 0) nova[p.i][p.j] += teta;
        else nova[p.i][p.j] -= teta;
    });

    return { nova, teta };
}

function resolver(problema: Problema) {
    let matriz = cantoNoroeste(problema);

    console.log("Inicial");
    console.table(matriz);
    console.log("Custo:", custoTotal(matriz, problema.custo));

    while (true) {
        const { u, v, deltas, menor } = modi(matriz, problema.custo);

        console.log("u", u);
        console.log("v", v);
        console.table(deltas);
        console.log("menor", menor);

        if (menor.valor >= 0) break;

        let ciclo = cicloSimples(matriz, { i: menor.i, j: menor.j });

        if (!ciclo) {
            console.log("Fallback ciclo aplicado");
            ciclo = cicloFallback({ i: menor.i, j: menor.j });
        }

        console.log("ciclo", ciclo);

        const { nova, teta } = ajustarCiclo(matriz, ciclo);

        console.log("teta", teta);
        console.table(nova);
        console.log("Custo:", custoTotal(nova, problema.custo));

        matriz = nova;
    }

    console.log("Ótimo final");
    console.table(matriz);
    console.log("Custo final:", custoTotal(matriz, problema.custo));
}

const problema: Problema = {
    custo: [
        [10,15,20],
        [12,25,28],
        [16,14,24]
    ],
    oferta: [50,40,60],
    demanda: [40,100,10]
};

resolver(problema);