import {
  Box,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../ts/hooks";
import { setDemanda, setEstoque } from "../ts/store";

export default function Entradas() {
  const { estoque, demanda } = useAppSelector(state => state.custos);
  const dispatch = useAppDispatch();

  const handleEstoqueChange = (index: number, value: string) => {
    dispatch(setEstoque({
      index,
      value: value === "" ? 0 : Number(value)
    }));
  };

  const handleDemandaChange = (index: number, value: string) => {
    dispatch(setDemanda({
      index,
      value: value === "" ? 0 : Number(value)
    }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
          Estoque
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {estoque.map((valor, i) => (
            <TextField
              key={i}
              label={`E${i + 1}`}
              value={valor ?? ""}
              onChange={(e) => handleEstoqueChange(i, e.target.value)}
              size="small"
              fullWidth
            />
          ))}
        </Box>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
          Demanda
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {demanda.map((valor, i) => (
            <TextField
              key={i}
              label={`D${i + 1}`}
              value={valor ?? ""}
              onChange={(e) => handleDemandaChange(i, e.target.value)}
              size="small"
              fullWidth
            />
          ))}
        </Box>
      </Paper>

    </Box>
  );
}