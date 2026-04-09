import { useState } from "react";
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";

export default function TabelaTransporte() {
  const linhas = 3;
  const colunas = 3;

  const [custos, setCustos] = useState(
    Array.from({ length: linhas }, () => Array(colunas).fill(""))
  );

  const [estoque, setEstoque] = useState(Array(linhas).fill(""));
  const [demanda, setDemanda] = useState(Array(colunas).fill(""));

  const handleCustoChange = (i: number, j: number, value: string) => {
    const novo = [...custos];
    novo[i][j] = value;
    setCustos(novo);
  };

  const handleEstoqueChange = (i: number, value: string) => {
    const novo = [...estoque];
    novo[i] = value;
    setEstoque(novo);
  };

  const handleDemandaChange = (j: number, value: string) => {
    const novo = [...demanda];
    novo[j] = value;
    setDemanda(novo);
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h5">Problema de Transporte</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {Array.from({ length: colunas }).map((_, j) => (
                <TableCell key={j} align="center">
                  Destino {j + 1}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {custos.map((linha, i) => (
              <TableRow key={i}>
                <TableCell>Origem {i + 1}</TableCell>

                {linha.map((valor, j) => (
                  <TableCell key={j} align="center">
                    <TextField
                      value={valor}
                      onChange={(e) => handleCustoChange(i, j, e.target.value)}
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Estoque</TableCell>
              <TableCell align="center">Demanda</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.from({ length: Math.max(estoque.length, demanda.length) }).map((_, i) => (
              <TableRow key={i}>
                <TableCell align="center">
                  {estoque[i] !== undefined && (
                    <TextField
                      label={`Origem ${i + 1}`}
                      value={estoque[i]}
                      onChange={(e) => handleEstoqueChange(i, e.target.value)}
                      size="small"
                    />
                  )}
                </TableCell>

                <TableCell align="center">
                  {demanda[i] !== undefined && (
                    <TextField
                      label={`Destino ${i + 1}`}
                      value={demanda[i]}
                      onChange={(e) => handleDemandaChange(i, e.target.value)}
                      size="small"
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}