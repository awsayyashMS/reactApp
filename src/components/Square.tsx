import { FC } from 'react';
import EGameOverClass from '../enums/EGameOverClass';
import ISquareProps from '../interfaces/ISquareProps';

const Square: FC<ISquareProps> = ({ handleButtonOnClick, value, isGameOver }: ISquareProps) => {
    const className = isGameOver ? EGameOverClass.GAME_OVER : '';
    return (
        <button className={'square ' + className} onClick={handleButtonOnClick} color="white">
            {value}
        </button>
    );
};

export default Square;
