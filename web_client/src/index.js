import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import ConfigStore from "./Utils/ConfigStore";
import { createBrowserHistory } from 'history'
import { Router } from 'react-router';

const history = createBrowserHistory();
export const store = ConfigStore(history);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
