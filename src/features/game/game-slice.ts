import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import EGameType from '../../enums/EGameType';
import { RootState } from '../../hooks/store';
import IGameState from '../../interfaces/IGameState';

const initialState: IGameState = { history: [Array(9).fill('')], currentMove: 0, gameType: EGameType.Two };

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        changeHistory(state, action: PayloadAction<string[]>) {
            const nextHistory = [...state.history.slice(0, state.currentMove + 1), action.payload];
            state.history = nextHistory;
        },
        resetHistory(state) {
            state.history = [Array(9).fill('')];
        },
        changeCurrentMove(state) {
            state.currentMove = state.history.length - 1;
        },
        changeCurrentMoveToIndex(state, action: PayloadAction<number>) {
            state.currentMove = action.payload;
        },
        resetCurrentMove(state) {
            state.currentMove = 0;
        },
        changeGameType(state, action: PayloadAction<EGameType>) {
            state.gameType = action.payload;
        },
    },
});

export const { changeHistory, changeCurrentMove, changeGameType, resetHistory, resetCurrentMove, changeCurrentMoveToIndex } =
    gameSlice.actions;
export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;
