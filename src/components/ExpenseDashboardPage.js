import React from 'react';

import * as moment from 'moment/moment';
moment.locale('es');

import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpenseSummary from './ExpenseSummary';

export class ExpenseDashboardPage extends React.Component {

    render() {
        return (
            <div>
                <hr></hr>
                <ExpenseSummary />
                <ExpenseListFilters />
                <ExpenseList />
            </div>
        );
    }
}


export default ExpenseDashboardPage;