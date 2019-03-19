//react
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { startSetExpenses } from './actions/expenses';

//redux
//provide the store to all the components of the app
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

//styles
import './styles/styles.scss';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';

//add firebase file to the app
import './firebase/firebase';

import * as moment from 'moment/moment';
moment.locale('es');


const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

//show loading screen while the data is populating into Redux from Firebase
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});


