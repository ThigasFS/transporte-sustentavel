import { Box, Button, Container, Typography } from "@mui/material"
import Entradas from "./components/Entrada"
import './App.css'
import { resetTudo, setMovimentos, setResultado } from "./ts/store"
import { cantoNoroeste } from "./ts/matriz"
import { useAppDispatch, useAppSelector } from "./ts/hooks"
import Variaveis from "./components/Variaveis"
import TabelaCustosEntrada from "./components/TabelasEntradas"
import TabelaCusto from "./components/TabelaCusto"

function App() {
  const dispatch = useAppDispatch();
  const { custos, estoque, demanda } = useAppSelector(state => state.custos);

  function dadosValidos() {
    return (
      custos.length > 0 &&
      estoque.every(v => v > 0) &&
      demanda.every(v => v > 0)
    );
  }

  function calcularTudo() {
    if (!dadosValidos()) return;

    const problema = {
      custo: custos,
      oferta: estoque,
      demanda: demanda
    };

    const resultado = cantoNoroeste(problema);

    dispatch(setResultado(resultado.matriz));
    dispatch(setMovimentos(resultado.movimentos));
  }

  function resetarTudo() {
    dispatch(resetTudo());
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, color: "white", fontWeight: "bold" }}>
        Problema de Transporte
      </Typography>

      <Typography variant="h5" sx={{ mb: 3, color: "white" }}>
        Entradas
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: ".40fr 1fr",
          alignItems: "start",
          gap: 3
        }}
      >
        <Entradas />
        <TabelaCustosEntrada />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
        <Button variant="contained" onClick={calcularTudo}>
          Calcular
        </Button>

        <Button variant="outlined" color="error" onClick={resetarTudo}>
          Resetar
        </Button>
      </Box>

      <Typography variant="h5" sx={{ mt: 5, mb: 3, color: "white" }}>
        Saídas
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 3
        }}
      >
        <Box>
          <Typography sx={{ color: "white", mb: 1 }}>
            Canto Noroeste
          </Typography>
          <TabelaCusto />
        </Box>

        <Box>
          <Typography sx={{ color: "white", mb: 1 }}>
            Variáveis
          </Typography>
          <Variaveis />
        </Box>
      </Box>
    </Container>
  );
}

export default App
