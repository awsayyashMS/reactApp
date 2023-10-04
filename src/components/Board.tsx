import '../App.css';
import { ALL_SQUARES, DIMENSIONS } from '../constants/constants';
import Square from './Square';

interface Props {
    handleSquareButtonOnClick: (index: number) => void;
    squares: string[];
    isGameOver: boolean;
    winnerLine: number[] | undefined;
}
export default function Board({ handleSquareButtonOnClick, squares, isGameOver, winnerLine }: Props) {
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
            <Square handleButtonOnClick={() => handleSquareButtonOnClick(i)} value={squares[i]} isGameOver={chooseIsGameOver} />
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
}
