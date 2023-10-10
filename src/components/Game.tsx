import EGameType from '../enums/EGameType';
import EPlayer from '../enums/EPlayer';
import EPlayerLetter from '../enums/EPlayerLetter';
import {
    changeCurrentMove,
    changeCurrentMoveToIndex,
    changeGameType,
    changeHistory,
    resetCurrentMove,
    resetHistory,
} from '../features/game/game-slice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import IWinnerResult from '../interfaces/IWinnerResult';
import { aiMove, calculateStatus, calculateWinner } from '../utils/utils';
import { Board } from './Board';
import GameType from './GameType';
import Status from './Status';
import History from './history';

export default function Game() {
    const history = useAppSelector(state => state.game.history);
    const currentMove = useAppSelector(state => state.game.currentMove);
    const gameType = useAppSelector(state => state.game.gameType);

    const dispatch = useAppDispatch();

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    let currentPlayer: EPlayer = EPlayer.Human;

    const winnerResult: IWinnerResult | null = calculateWinner(currentSquares);
    const { turnStatus, isGameOver } = calculateStatus(winnerResult, currentSquares, xIsNext);

    function resetGame() {
        dispatch(resetHistory());
        dispatch(resetCurrentMove());
    }
    function onChangeGameType(event: any) {
        dispatch(changeGameType(event.target.value));
        resetGame();
    }

    const handleSquareOnClickAI = (index: number): void => {
        const winner = calculateWinner(currentSquares); // isGameOver
        if (currentSquares[index] || winner || currentPlayer === EPlayer.AI) {
            return;
        }
        const nextSquares = [...currentSquares];
        nextSquares[index] = EPlayerLetter.X;
        dispatch(changeHistory(nextSquares));
        dispatch(changeCurrentMove());
        currentPlayer = EPlayer.AI;
        const newSquares = aiMove(nextSquares);

        if (newSquares !== null) {
            dispatch(changeHistory(newSquares));
            dispatch(changeCurrentMove());
        }
        currentPlayer = EPlayer.Human;
    };

    const handleSquareOnClickTwoPlayers = (index: number): void => {
        const winner = calculateWinner(currentSquares); // isGameOver
        if (currentSquares[index] || winner || currentPlayer === EPlayer.AI) {
            return;
        }
        const nextSquares = [...currentSquares];

        if (xIsNext) {
            nextSquares[index] = EPlayerLetter.X;
        } else {
            nextSquares[index] = EPlayerLetter.O;
        }
        dispatch(changeHistory(nextSquares));
        dispatch(changeCurrentMove());
    };

    function jumpTo(nextMove: number) {
        dispatch(changeCurrentMoveToIndex(nextMove));
    }

    const buttonCallback = gameType === EGameType.Two ? handleSquareOnClickTwoPlayers : handleSquareOnClickAI;
    return (
        <>
            <header>
                <GameType handleRadioOnClick={onChangeGameType} />
                <Status status={turnStatus} />
            </header>
            <main className="game">
                <div className="game-board">
                    <Board handleSquareButtonOnClick={buttonCallback} isGameOver={isGameOver} winnerLine={winnerResult?.lines} />
                </div>
                <History handleJumpTo={jumpTo} />
            </main>
        </>
    );
}
