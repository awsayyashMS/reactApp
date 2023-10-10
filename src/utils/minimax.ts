import { ALL_SQUARES } from '../constants/constants';
import EPlayerLetter from '../enums/EPlayerLetter';
import EScores from '../enums/EScores';
import { calculateWinner, isDraw } from './utils';

const minimax = (squares: string[], depth: number = 0, isMaximizing: boolean): number => {
    let winner = calculateWinner(squares);
    let score = -1;

    if (winner) {
        if (winner.winner === 'X') {
            score = EScores.X;
        } else {
            score = EScores.O;
        }
        return score;
    } else if (isDraw(squares)) {
        score = EScores.draw;
        return score;
    }

    const evaluateMove = (index: number, playerLetter: EPlayerLetter): number => {
        squares[index] = playerLetter;
        const scoreM = minimax(squares, depth + 1, !isMaximizing);
        squares[index] = '';
        return isMaximizing ? Math.max(scoreM, bestScore) : Math.min(scoreM, bestScore);
    };

    let bestScore: number = isMaximizing ? -Infinity : Infinity;

    for (let i = 0; i < ALL_SQUARES; i++) {
        if (squares[i] === '') {
            const playerLetter = isMaximizing ? EPlayerLetter.O : EPlayerLetter.X;
            const scoreM = evaluateMove(i, playerLetter);
            bestScore = isMaximizing ? Math.max(scoreM, bestScore) : Math.min(scoreM, bestScore);
        }
    }

    return bestScore;
};

export default minimax;
