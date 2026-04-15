import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movimento } from "./types";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type TransporteState = {
    custos: number[][];
    estoque: number[];
    demanda: number[];
    matrizResultado: number[][] | null;
    movimentos: Movimento[]
}

const initialState: TransporteState = {
    custos: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    estoque: [0, 0, 0],
    demanda: [0, 0, 0],
    matrizResultado: null,
    movimentos: []
}

const transporteSlice = createSlice({
    name: 'transporte',
    initialState,
    reducers: {
        setCustos: (state, { payload }: PayloadAction<number[][]>) => {
            state.custos = payload;
        },
        setEstoque: (state, action: PayloadAction<{ index: number, value: number }>) => {
            state.estoque[action.payload.index] = action.payload.value;
        },

        setDemanda: (state, action: PayloadAction<{ index: number, value: number }>) => {
            state.demanda[action.payload.index] = action.payload.value;
        },
        setResultado: (state, { payload }: PayloadAction<number[][]>) => {
            state.matrizResultado = payload;
        },
        setMovimentos: (state, { payload }: PayloadAction<Movimento[]>) => {
            state.movimentos = payload;
        },
        resetTudo: (state) => {
            state.custos = [];
            state.estoque = [];
            state.demanda = [];
            state.matrizResultado = null;
            state.movimentos = [];
        }
    }
});

export const {
    setCustos,
    setEstoque,
    setDemanda,
    setResultado,
    setMovimentos,
    resetTudo,
} = transporteSlice.actions;

export const store = configureStore({
    reducer: {
        custos: transporteSlice.reducer
    }
})