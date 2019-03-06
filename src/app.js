import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import './styles/styles.scss';
import 'normalize.css/normalize.css';

const store = configureStore();

store.dispatch(addExpense({ description: 'Water bill', amount: '26000' }));
store.dispatch(addExpense({ description: 'Gas bill', amount: '15000' }));
store.dispatch(setTextFilter('bill'));

const state = store.getState();
console.log(getVisibleExpenses(state.expenses, state.filters));

ReactDOM.render(<AppRouter />, document.getElementById('app'));


