import { ALL_SQUARES } from "../constants/constants";
import { EPlayerLetter } from "../enums/EPlayerLetter";
import { EScores } from "../enums/EScores";
import { calculateWinner, isDraw } from "./utils";



const minimax = (squares: any[], depth: number = 0, isMaximizing: boolean): number => {

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

    if (isMaximizing) {

        let bestScore: number = -Infinity;

        for (let i = 0; i < ALL_SQUARES; i++) {
            // means it is available spot to put a
            if (squares[i] === null) {
                squares[i] = EPlayerLetter.O; // for the ai
                let scoreM = minimax(squares, depth + 1, false);
                squares[i] = null; // for the ai


                bestScore = Math.max(scoreM, bestScore);


            }
        }
        return bestScore;
        //return checkAllPossibilities(squares, depth, false)[0]

    } else {

        let bestScore: number = Infinity;

        for (let i = 0; i < ALL_SQUARES; i++) {
            // means it is available spot to put a
            if (squares[i] === null) {
                squares[i] = EPlayerLetter.X; // for the human
                let scoreM: number = minimax(squares, depth + 1, true);
                squares[i] = null;

                bestScore = Math.min(scoreM, bestScore)

            }
        }
        return bestScore;
        //return checkAllPossibilities(squares, depth, true)[0]
    }



}

/*export const checkAllPossibilities = (squares: any[], depth: number = 0, isMaximizing: boolean): [number, number] => {

    let bestScore: number;
    let bestMove: number = 0;
    if (isMaximizing)
        bestScore = -Infinity;
    else
        bestScore = Infinity;

    for (let i = 0; i < ALL_SQUARES; i++) {
        // means it is available spot to put a
        if (squares[i] === null) {

            let score: number;
            if (isMaximizing) {
                squares[i] = EPlayerLetter.O; // for the ai

                score = minimax(squares, depth + 1, false);
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
            else {
                squares[i] = EPlayerLetter.X; // for the human

                score = minimax(squares, depth + 1, true);
                if (score < bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
            squares[i] = null;

            /*if (isMaximizing) {
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
                //bestScore = Math.max(score, bestScore)

            } else {
                if (score < bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
                //bestScore = Math.min(score, bestScore)

            }

        }
    }
    return [bestScore, bestMove];

}*/

export default minimax;
