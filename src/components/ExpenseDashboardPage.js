import React from 'react';
import ReactDOM from 'react-dom';

import * as moment from 'moment/moment';
moment.locale('es');

import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesTotal from './ExpensesTotal';

const ExpenseDashboardPage = () => {

    return (
        <div>
            <hr></hr>
            <ExpensesTotal />
            <ExpenseListFilters />
            <ExpenseList />
        </div>
    );
}


export default ExpenseDashboardPage;