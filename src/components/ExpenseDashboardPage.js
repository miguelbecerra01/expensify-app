import React from 'react';
import ReactDOM from 'react-dom';

import * as moment from 'moment/moment';
moment.locale('es');

import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

const ExpenseDashboardPage = () => {

    return (
        <div>
            <hr></hr>
            <ExpensesSummary />
            <ExpenseListFilters />
            <ExpenseList />
        </div>
    );
}


export default ExpenseDashboardPage;