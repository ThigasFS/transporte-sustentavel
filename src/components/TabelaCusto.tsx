import {
  Table, TableBody, TableCell, TableContainer,
  TableRow, Paper, Typography
} from "@mui/material";
import { useAppSelector } from "../ts/hooks";
import type { Movimento } from "../ts/types";

export default function TabelaCusto() {
  const matriz = useAppSelector(state => state.custos.matrizResultado);
  const movimentos = useAppSelector(state => state.custos.movimentos) ?? [];

  if (!matriz || matriz.length === 0) {
    return <Typography sx={{ color: 'white' }}>Nenhum cálculo realizado</Typography>;
  }

  const mapaMovimentos = new Map<string, Movimento>();

  movimentos.forEach(m => {
    mapaMovimentos.set(`${m.i}-${m.j}`, m);
  });

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Table size="small">
        <TableBody>
          {matriz.map((linha, i) => (
            <TableRow key={i}>
              {linha.map((valor, j) => {
                const movimento = mapaMovimentos.get(`${i}-${j}`);

                return (
                  <TableCell
                    key={j}
                    align="center"
                    sx={{
                      width: 90,
                      height: 70,
                      fontWeight: "bold",
                      background: valor > 0
                        ? "linear-gradient(135deg, #1976d2, #42a5f5)"
                        : "#f5f5f5",
                      color: valor > 0 ? "#fff" : "#999"
                    }}
                  >
                    {valor > 0 ? (
                      <>
                        <div>{valor}</div>
                        <div style={{ fontSize: 11 }}>
                          #{movimento?.ordem ?? "-"}
                        </div>
                      </>
                    ) : "-"}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}