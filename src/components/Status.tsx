import '../App.css';

interface Props {
    status: string;
}

const Status = ({ status }: Props) => {
    return <div className="status">{status}</div>;
};

export default Status;
