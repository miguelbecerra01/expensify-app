import React from 'react';
import ReactDOM from 'react-dom';

import * as moment from 'moment/moment';
moment.locale('es');

import AppRouter from './routers/AppRouter';
//provide the store to all the components of the app
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';


import './styles/styles.scss';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';

//add firebase file to the app
import './firebase/firebase';

// import './playground/promises';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));


