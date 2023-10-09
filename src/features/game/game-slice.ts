// DUCKS pattern
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { EGameType } from '../../enums/EGameType';

interface GameState {
    history: any[][];
    currentMove: number;
    gameType: EGameType;
}

const initialState: GameState = { history: [Array(9).fill(null)], currentMove: 0, gameType: EGameType.Two };

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        changeHistory(state, action: PayloadAction<any[]>) {
            const nextHistory = [...state.history.slice(0, state.currentMove + 1), action.payload /**nextSquares */];
            state.history = nextHistory; //action.payload; //[...state.history, action.payload];
        },
        resetHistory(state) {
            state.history = [Array(9).fill(null)]; //[...state.history, action.payload];
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
//export const selectGameHistory = (state: RootState) => state.game.history;
//export const selectGameCurrentMove = (state: RootState) => state.game.currentMove;
//export const selectGameType = (state: RootState) => state.game.gameType;

export default gameSlice.reducer;
