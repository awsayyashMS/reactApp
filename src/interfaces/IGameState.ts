import EGameType from '../enums/EGameType';

export default interface IGameState {
    history: string[][];
    currentMove: number;
    gameType: EGameType;
}
