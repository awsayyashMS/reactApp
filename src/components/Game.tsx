import { useState } from 'react';
//import { useAppDispatch,useAppSelector } from '../app/hooks';
//import {addHistory} from '../features/game/game-slice'
//import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ALL_SQUARES, DIMENSIONS } from '../constants/constants';
import { EGameType } from '../enums/EGameType';
import { EPlayer } from '../enums/EPlayer';
import { EPlayerLetter } from '../enums/EPlayerLetter';
import { changeCurrentMove, changeGameType, changeHistory } from '../features/game/game-slice';
import { ActionTypes } from '../reducers/ActionTypes';
import minimax from '../utils/minimax';
import { calculateWinner, isDraw } from '../utils/utils';
import Board from './Board';
import GameType from './GameType';
import Status from './Status';

export default function Game() {
    const history = useAppSelector(state => state.game.history);
    const currentMove = useAppSelector(state => state.game.currentMove);
    const gameType = useAppSelector(state => state.game.gameType);
    const dispatch = useAppDispatch();

    //const currentMove = useAppSelector((state) => state.history)
    // const histValue  = useAppSelector((state) => state.history.value);
    // const histDispatch = useAppDispatch()

    // function handleHistory(newSquares:any[]){
    //   histDispatch(addHistory(newSquares))
    // }

    //const dispatch = useDispatch()

    //let history: any[][] = store.getState().history;
    //let gameType: EGameType = store.getState().gameType;
    //let currentMove: number = store.getState().currentMove;

    /*store.subscribe(() => {
        history = store.getState().history;
        currentMove = store.getState().currentMove;
        gameType = store.getState().gameType;
    });*/
    /*store.subscribe(() => {
        currentMove = store.getState().currentMove;
    });
    let gameType: EGameType = store.getState().gameType;
    store.subscribe(() => {
        gameType = store.getState().gameType;
    });*/

    // const [history, setHistory] = useState([Array(9).fill(null)]);
    // const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    let isGameOver = false;
    let currentPlayer: EPlayer = EPlayer.Human;
    //const [gameType, setGameType] = useState(EGameType.Two);

    function resetGame() {
        //store.
        //setHistory([Array(9).fill(null)]);
        //store.dispatch({ type: ActionTypes.ResetHistory, payload: [] });
        dispatch(changeHistory([]));
        //setCurrentMove(0);
        //store.dispatch({ type: ActionTypes.ChangeCurrentMove, payload: 0 });
        dispatch(changeCurrentMove(0));
    }
    function onChangeGameType(event: any) {
        //setGameType(event.target.value);
        //store.dispatch({ type: ActionTypes.SetGameType, payload: event.target.value });
        dispatch(changeCurrentMove(event.target.value));

        resetGame();
    }

    function aiMove(nextSquares: any[]): void {
        let bestScore: number = -Infinity;
        let bestMove: number = -1;

        //const  bestMove = checkAllPossibilities(nextSquares, 0, false)[1];
        console.log('in ai move=nextSquares=', nextSquares);
        for (let i = 0; i < ALL_SQUARES; i++) {
            // means it is available spot to put a
            if (nextSquares[i] === null) {
                nextSquares[i] = EPlayerLetter.O; // for the ai
                let score = minimax(nextSquares, 0, false);
                nextSquares[i] = null;

                if (score >= bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        nextSquares[bestMove] = EPlayerLetter.O;
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        //setHistory(nextHistory);
        //store.dispatch({ type: ActionTypes.AddHistory, payload: nextHistory });
        dispatch(changeHistory(nextHistory));

        // setCurrentMove(nextHistory.length - 1);
        /* store.dispatch({
            type: ActionTypes.ChangeCurrentMove,
            payload: /* store.getState().history.length -1 history ? history.length - 1 : 0,
        });*/
        dispatch(changeCurrentMove(history.length - 1));

        currentPlayer = EPlayer.Human;
    }
    const handleSquareOnClickAI = (index: number): void => {
        const winner = calculateWinner(currentSquares); // isGameOver
        if (currentSquares[index] || winner || currentPlayer === EPlayer.AI) {
            return;
        }
        const nextSquares = [...currentSquares];

        nextSquares[index] = EPlayerLetter.X;
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        //setHistory(nextHistory);
        //store.dispatch({ type: ActionTypes.AddHistory, payload: nextHistory });
        dispatch(changeHistory(nextHistory));

        //setCurrentMove(nextHistory.length - 1);
        /*store.dispatch({
            type: ActionTypes.ChangeCurrentMove,
            payload: /* store.getState().history.length -1  history ? history.length - 1 : 0,
        });*/
        dispatch(changeCurrentMove(history.length - 1));

        console.log('in handle=nextSquares=', nextSquares);

        currentPlayer = EPlayer.AI;

        aiMove(nextSquares);
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
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        //setHistory(nextHistory);
        //store.dispatch({ type: ActionTypes.AddHistory, payload: nextHistory });
        dispatch(changeHistory(nextHistory));

        // setCurrentMove(nextHistory.length - 1);
        // store.dispatch({ type: ActionTypes.ChangeCurrentMove, payload: /*store.getState().*/ history ? history.length - 1 : 0 });
        dispatch(changeCurrentMove(history.length - 1));

        console.log('in handle=nextSquares=', nextSquares);
    };

    const winnerResult = calculateWinner(currentSquares);

    let turnStatus;
    if (winnerResult) {
        turnStatus = 'Winner: ' + winnerResult.winner;
        isGameOver = true;
    } else {
        if (isDraw(currentSquares)) {
            console.log('time');
            turnStatus = 'Draw';
        } else {
            turnStatus = 'Next player: ' + (xIsNext ? 'X' : 'O');
        }
    }

    function jumpTo(nextMove: number) {
        //setCurrentMove(nextMove);
        // store.dispatch({ type: ActionTypes.ChangeCurrentMove, payload: nextMove });
        dispatch(changeCurrentMove(nextMove));
    }

    const historyMoves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    const buttonCallback = gameType === EGameType.Two ? handleSquareOnClickTwoPlayers : handleSquareOnClickAI;
    return (
        <main className="game">
            <GameType handleRadioOnClick={onChangeGameType} gameType={gameType} />
            <Status status={turnStatus} />
            <div className="game-board">
                <Board
                    handleSquareButtonOnClick={buttonCallback}
                    squares={currentSquares}
                    isGameOver={isGameOver}
                    winnerLine={winnerResult?.lines}
                />
            </div>
            <div className="game-info">
                <ol>{historyMoves}</ol>
            </div>
        </main>
    );
}
