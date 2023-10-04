import { useState } from 'react';
import { EGameType } from '../enums/EGameType';

interface Props {
    handleRadioOnClick: (event: React.FormEvent<HTMLDivElement>) => void;
    gameType: string;
}

const GameType = ({ handleRadioOnClick, gameType }: Props) => {
    return (
        <>
            <div>Choose game type:</div>
            <div>
                <input type="radio" value={EGameType.Two} name="type" checked={gameType === EGameType.Two} onChange={handleRadioOnClick} />{' '}
                Two players
                <input type="radio" value={EGameType.AI} name="type" checked={gameType === EGameType.AI} onChange={handleRadioOnClick} /> AI
            </div>
        </>
    );
};

export default GameType;
