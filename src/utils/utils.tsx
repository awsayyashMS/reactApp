import { WinnerResult } from '../interfaces/WinnerResult';

export function calculateWinner(squares: string[]): WinnerResult | null {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            //const winner = squares[a] == EScores.X ? EScores.X : EScores.O;
            return { winner: squares[a], lines: lines[i] };
        }
    }

    return null;
}

export function isDraw(squares: string[]): boolean {
    let result = true;
    squares.forEach(element => {
        if (element === null) {
            result = false;
            return;
        }
    });

    return result;
}
