import { FC } from 'react';
import { useAppSelector } from '../hooks/hooks';
import IHistoryProps from '../interfaces/IHistoryProps';

const History: FC<IHistoryProps> = ({ handleJumpTo }: IHistoryProps) => {
    const history = useAppSelector(state => state.game.history);

    const historyMoves = history.map((_, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => handleJumpTo(move)}>{description}</button>
            </li>
        );
    });
    return (
        <div className="game-info">
            <ol>{historyMoves}</ol>
        </div>
    );
};

export default History;
