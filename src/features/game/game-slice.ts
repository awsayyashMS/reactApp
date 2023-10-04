// DUCKS pattern
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface HistoryState {
    value: any[][];
}

const initialState: HistoryState = { value: [Array(9).fill(null)] };

const historySlice = createSlice({ name: 'history', initialState, 
    reducers: {

        addHistory(state){
            state.value = [...state.value];
        }
        
    } 
});


export const {addHistory} = historySlice.actions;
export default historySlice.reducer;