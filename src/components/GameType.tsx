import { FC, useState } from 'react';
import { EGameType } from '../enums/EGameType';

interface IGameType {
    handleRadioOnClick: (event: React.FormEvent<HTMLDivElement>) => void;
    gameType: string;
}

const GameType: FC<IGameType> = ({ handleRadioOnClick, gameType }) => {
    return (
        <>
            <div>Choose game type:</div>
            <div>
                <input type="radio" value={EGameType.Two} name="type" checked={gameType === EGameType.Two} onClick={handleRadioOnClick} />
                Two players
                <input type="radio" value={EGameType.AI} name="type" checked={gameType === EGameType.AI} onClick={handleRadioOnClick} /> AI
            </div>
        </>
    );
};

export default GameType;
