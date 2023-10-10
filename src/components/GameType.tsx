import { FC } from 'react';
import EGameType from '../enums/EGameType';
import { useAppSelector } from '../hooks/hooks';
import IGameTypeProps from '../interfaces/IGameTypeProps';

const GameType: FC<IGameTypeProps> = ({ handleRadioOnClick }: IGameTypeProps) => {
    const gameType: string = useAppSelector(state => state.game.gameType);

    return (
        <>
            <div>
                <label>Choose game type:</label>
                <input type="radio" value={EGameType.Two} name="type" checked={gameType === EGameType.Two} onChange={handleRadioOnClick} />
                Two players
                <input type="radio" value={EGameType.AI} name="type" checked={gameType === EGameType.AI} onChange={handleRadioOnClick} /> AI
            </div>
        </>
    );
};

export default GameType;
