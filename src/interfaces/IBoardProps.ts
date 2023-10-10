export default interface IBoardProps {
    handleSquareButtonOnClick: (index: number) => void;
    isGameOver: boolean;
    winnerLine?: number[];
}
