import { ActionTypes } from "./ActionTypes";

const addHistoryAction = (squares: any[]): IAction => {
    return {
        type: ActionTypes.AddHistory,
        payload: squares,
    };
};
const resetHistoryAction = (): IAction => {
    return {
        type: ActionTypes.AddHistory,
        payload: null,
    };
};