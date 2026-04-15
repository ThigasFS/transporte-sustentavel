import { Box, Paper, Typography } from "@mui/material";
import { useAppSelector } from "../ts/hooks";

type Celula = {
    i: number;
    j: number;
};

export default function Variaveis() {
    const matriz = useAppSelector((state) => state.custos.matrizResultado);
    const custos = useAppSelector((state) => state.custos.custos);

    if (!matriz || matriz.length === 0 || !custos || custos.length === 0) {
        return <Typography sx={{ color: "white" }}>Nenhum cálculo realizado</Typography>;
    }

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

    const u: (number | null)[] = new Array(linhas).fill(null);
    const v: (number | null)[] = new Array(colunas).fill(null);

    u[0] = 0;

    let alterou = true;

    while (alterou) {
        alterou = false;

        for (const { i, j } of basicas) {
            if (u[i] !== null && v[j] === null) {
                v[j] = custos[i][j] - u[i];
                alterou = true;
            } else if (v[j] !== null && u[i] === null) {
                u[i] = custos[i][j] - v[j];
                alterou = true;
            }
        }
    }

    const deltas: { i: number; j: number; valor: number }[] = [];

    for (const { i, j } of naoBasicas) {
        const delta = custos[i][j] - (u[i]! + v[j]!);

        deltas.push({
            i,
            j,
            valor: delta
        });
    }

    const isOtima = deltas.every(d => d.valor >= 0);

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2
            }}
        >
            {[
                { titulo: "Variáveis U", dados: u.map((v, i) => `U${i + 1} = ${v}`) },
                { titulo: "Variáveis V", dados: v.map((v, i) => `V${i + 1} = ${v}`) },
                {
                    titulo: "Básicas",
                    dados: basicas.map(b => `X(${b.i + 1},${b.j + 1}) = ${matriz[b.i][b.j]}`)
                },
                {
                    titulo: "Não Básicas",
                    dados: deltas.map(d => `X(${d.i + 1},${d.j + 1}) = ${d.valor} ${d.valor < 0 ? "❌" : "✅"}`)
                },
                {
                    titulo: "Status",
                    dados: [
                        isOtima ? "Solução Ótima ✅" : "Solução NÃO Ótima ❌"
                    ]
                }
            ].map((bloco, idx) => (
                <Paper
                    key={idx}
                    sx={{
                        p: 2,
                        borderRadius: 3,
                        background: "#1e1e1e",
                        color: "#fff"
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ mb: 1, fontWeight: "bold" }}
                    >
                        {bloco.titulo}
                    </Typography>

                    {bloco.dados.map((item, i) => (
                        <Typography
                            key={i}
                            sx={{ fontSize: 14, opacity: 0.85 }}
                        >
                            {item}
                        </Typography>
                    ))}
                </Paper>
            ))}
        </Box>
    );
}