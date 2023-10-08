import './App.css';
import Game from './components/Game';

function App({ store }: any) {
    return <Game store={store} />;
}

export default App;
