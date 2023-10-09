import { FC } from 'react';
import { useAppSelector } from '../app/hooks';
import { EGameType } from '../enums/EGameType';

interface IGameTypeProps {
    handleRadioOnClick: (event: React.FormEvent<HTMLDivElement>) => void;
    ///gameType: string;
}

const GameType: FC<IGameTypeProps> = ({ handleRadioOnClick }) => {
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
