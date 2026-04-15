import {
  Table, TableBody, TableCell,
  TableContainer, TableRow, Paper, TextField
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../ts/hooks";
import { setCustos } from "../ts/store";

export default function TabelaCustosEntrada() {
  const dispatch = useAppDispatch();
  const { custos } = useAppSelector(state => state.custos);

  const matriz = custos.length
    ? custos
    : Array.from({ length: 3 }, () => Array(3).fill(0));

  const handleChange = (i: number, j: number, value: string) => {
    const novaMatriz = matriz.map(l => [...l]);

    novaMatriz[i][j] = value === "" ? 0 : Number(value);

    dispatch(setCustos(novaMatriz));
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        p: 2,
        height: "fit-content",
        alignSelf: "start"
      }}
    >
      <Table size="small">
        <TableBody sx={{ "& tr:last-child td": { borderBottom: 0 } }}>
          {matriz.map((linha, i) => (
            <TableRow key={i}>
              {linha.map((valor, j) => (
                <TableCell key={j} sx={{ p: 1 }}>
                  <TextField
                    value={valor ?? ""}
                    onChange={(e) => handleChange(i, j, e.target.value)}
                    size="small"
                    fullWidth
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}