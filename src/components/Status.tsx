import { FC } from 'react';
import IStatusProps from '../interfaces/IStatusProps';

const Status: FC<IStatusProps> = ({ status }: IStatusProps) => {
    return <div className="status">{status}</div>;
};

export default Status;
