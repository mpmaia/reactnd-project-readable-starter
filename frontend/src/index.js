import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import getStore from './redux/store';
import { BrowserRouter } from 'react-router-dom'

const store = getStore({posts:[], categories:[], postOrderBy: 'voteScore'});

ReactDOM.render(
    (
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    ), document.getElementById('root'));

registerServiceWorker();
