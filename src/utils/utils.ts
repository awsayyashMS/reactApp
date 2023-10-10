import { ALL_SQUARES, WinnerLines } from '../constants/constants';
import EPlayerLetter from '../enums/EPlayerLetter';
import EStatus from '../enums/EStatus';
import ITurnStatusResult from '../interfaces/ITurnStatusResult';
import IWinnerResult from '../interfaces/IWinnerResult';
import minimax from './minimax';

export function calculateWinner(squares: string[]): IWinnerResult | null {
    if (!squares) return null;

    for (let i = 0; i < WinnerLines.length; i++) {
        const [a, b, c] = WinnerLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], lines: WinnerLines[i] };
        }
    }

    return null;
}

export function isDraw(squares: string[]): boolean {
    if (!squares) return false;
    let result = true;
    squares.forEach(element => {
        if (element === '') {
            result = false;
            return;
        }
    });

    return result;
}

export const aiMove = (nextSquares: string[]): string[] | null => {
    const winner = calculateWinner(nextSquares); // isGameOver?
    if (winner || isDraw(nextSquares)) {
        return null;
    }
    let bestScore: number = -Infinity;
    let bestMove: number = -1;

    const nextSquaresCopy = [...nextSquares];

    console.log('in ai move=nextSquaresCopy=', nextSquaresCopy);
    for (let i = 0; i < ALL_SQUARES; i++) {
        // means it is available spot for the AI
        if (nextSquaresCopy[i] === '') {
            console.log('ai move= null');
            nextSquaresCopy[i] = EPlayerLetter.O; // for the ai
            let score = minimax(nextSquaresCopy, 0, false);
            nextSquaresCopy[i] = '';

            if (score >= bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    nextSquaresCopy[bestMove] = EPlayerLetter.O;

    return nextSquaresCopy;
};

export function calculateStatus(winnerResult: IWinnerResult | null, currentSquares: string[], xIsNext: boolean): ITurnStatusResult {
    let turnStatus;
    let isGameOver: boolean = false;
    if (winnerResult) {
        turnStatus = EStatus.Winner + ': ' + winnerResult.winner;
        isGameOver = true;
    } else {
        if (isDraw(currentSquares)) {
            console.log('it is draw');
            turnStatus = EStatus.Draw;
        } else {
            turnStatus = EStatus.Next + ': ' + (xIsNext ? 'X' : 'O');
        }
    }
    return { turnStatus: turnStatus, isGameOver: isGameOver };
}
