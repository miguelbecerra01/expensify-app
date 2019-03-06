import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
//provide the store to all the components of the app
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import './styles/styles.scss';
import 'normalize.css/normalize.css';

const store = configureStore();

store.dispatch(addExpense({ description: 'Water bill', amount: '26000' }));
store.dispatch(addExpense({ description: 'Gas bill', amount: '15000' }));

store.dispatch(setTextFilter('water'));

setTimeout(() => {
    store.dispatch(setTextFilter('bill'));
}, 3000);


const state = store.getState();
console.log(getVisibleExpenses(state.expenses, state.filters));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);



ReactDOM.render(jsx, document.getElementById('app'));


