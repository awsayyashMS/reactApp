interface Props {
    handleButtonOnClick: () => void;
    value: string;
    isGameOver: boolean;
}

const Square = ({ handleButtonOnClick, value, isGameOver }: Props) => {
    let className = ' ';
    if (isGameOver) className = ' game-over';
    return (
        <button className={'square' + className} onClick={handleButtonOnClick} color="white">
            {value}
        </button>
    );
};

export default Square;
