import { FC } from 'react';
import { DIMENSIONS } from '../constants/constants';
import { useAppSelector } from '../hooks/hooks';
import IBoardProps from '../interfaces/IBoardProps';
import Square from './Square';

export const Board: FC<IBoardProps> = ({ handleSquareButtonOnClick, isGameOver, winnerLine }: IBoardProps) => {
    const history = useAppSelector(state => state.game.history);
    const currentMove = useAppSelector(state => state.game.currentMove);
    const currentSquares = history[currentMove];

    const renderSquare = (i: number) => {
        const chooseIsGameOver: boolean = isGameOver && winnerLine?.includes(i) ? true : false;
        return (
            <Square
                key={i}
                handleButtonOnClick={() => handleSquareButtonOnClick(i)}
                value={currentSquares[i]}
                isGameOver={chooseIsGameOver}
            />
        );
    };

    const renderBoardRow = (row: number) => {
        const squaresInRow: JSX.Element[] = Array(3)
            .fill(null)
            .map((_, col) => renderSquare(row * DIMENSIONS + col));
        return (
            <div key={row} className="board-row">
                {squaresInRow}
            </div>
        );
    };

    const boardRows = Array(3)
        .fill(null)
        .map((_, row) => renderBoardRow(row));

    return <>{boardRows}</>;
};
