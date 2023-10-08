import React from 'react';
import ReactDOM from 'react-dom/client';
//import { Provider } from 'react-redux';
import App from './App';
//import store  from './store/store';
import './index.css';

import {store} from './app/store';
import { Provider } from 'react-redux';

//const store = createStore(historyReducer);
console.log(store)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
