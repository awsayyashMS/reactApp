import { FC } from 'react';
import '../App.css';
import { ALL_SQUARES, DIMENSIONS } from '../constants/constants';
import Square from './Square';
import { useAppSelector } from '../app/hooks';

interface Props {
    handleSquareButtonOnClick: (index: number) => void;
    //squares: string[];
    isGameOver: boolean;
    winnerLine: number[] | undefined;
}
export const Board: FC<Props> = ({ handleSquareButtonOnClick, isGameOver, winnerLine }: Props) => {

    const history = useAppSelector(state => state.game.history);
    const currentMove = useAppSelector(state => state.game.currentMove);

    const currentSquares = history[currentMove];

    const mappedSquares = Array(ALL_SQUARES).fill('');
    const boardComponent = Array(DIMENSIONS).fill(null);
    for (let i = 0; i < ALL_SQUARES; i++) {
        let chooseIsGameOver = false;
        if (isGameOver) {
            if (winnerLine?.includes(i)) {
                chooseIsGameOver = isGameOver;
            }
        }

        mappedSquares[i] = (
            <Square handleButtonOnClick={() => handleSquareButtonOnClick(i)} value={currentSquares[i]} isGameOver={chooseIsGameOver} />
        );
    }

    let counter = 0;
    for (let i = 0; i < DIMENSIONS; i++) {
        // boardComponent[counter] =
        // <div className="board-row">;
        //for (let j = 0; j < DIMENSIONS; j++) {
        boardComponent[counter] = (
            <div className="board-row">
                {mappedSquares[counter++]} {mappedSquares[counter++]} {mappedSquares[counter++]}
            </div>
        );
        //}
    }

    return <>{boardComponent}</>;
};
