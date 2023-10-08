import { EGameType } from '../enums/EGameType';
import { ActionTypes } from './ActionTypes';

let initialState = {
    history: [Array(9).fill(null)],
    currentMove: 0,
    gameType: EGameType.Two,
};

// NOTE:
// It is important to pass an initial state as default to
// the state parameter to handle the case of calling
// the reducers for the first time when the
// state might be undefined

export const historyReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.AddHistory:
            return {
                ...state,

                history: action.payload,
                //currentMove: state.currentMove,
            };
        case ActionTypes.ResetHistory:
            return {
                ...state,
                history: [...state.history],
            };
        case ActionTypes.ChangeCurrentMove:
            return {
                ...state,

                currentMove: action.payload,
            };
        case ActionTypes.SetGameType:
            return {
                ...state,

                gameType: action.payload,
            };
        default:
            return state;
    } // Important to handle the default behavior
}; // either by returning the whole state as it is
// or by performing any required logic
