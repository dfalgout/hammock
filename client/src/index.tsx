import '@babel/polyfill';

import axios from 'axios';
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Session from './components/session/Session';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import './styles.scss';

import amber from '@material-ui/core/colors/amber';
import App from './containers/app/App';
import Cookies from 'universal-cookie';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentDateUtils from '@date-io/moment';
import { MuiThemeProvider } from '@material-ui/core/styles';

const { SERVICE = 'localhost', SERVICE_PORT = 8080 } = process.env;

const cookies = new Cookies();

let store: any;
const baseURL = `http://${SERVICE}:${SERVICE_PORT}`;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(thunk, createLogger()),
        ),
      );
} else {
    store = createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk),
        ),
    );
}

axios.interceptors.request.use((config) => {
    const mutatorMethods = ['POST', 'PUT'];

    config.baseURL = baseURL;
    if (mutatorMethods.includes(config.method)) {
        config.headers.contentType = 'application/json';
    }

    const token = cookies.get('access_token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

const theme = createMuiTheme({
    palette: {
        primary: {
            contrastText: '#1f2023',
            dark: amber[700],
            light: amber[300],
            main: amber[500],
        },
        secondary: {
            contrastText: '#1f2023',
            dark: amber[700],
            light: amber[300],
            main: '#ffffff',
        },
    },
    typography: {
        useNextVariants: true,
    },
});

render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentDateUtils}>
                <Router>
                    <Session>
                        <CssBaseline />
                        <App />
                    </Session>
                </Router>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'),
);
