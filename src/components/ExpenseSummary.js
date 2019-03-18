import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectExpenseSummary from '../selectors/expense-summary';
import selectExpenses from '../selectors/expenses';

export const ExpenseSummary = ({ quantity, total }) => {
    const expenseWord = quantity <= 1 ? 'expense' : 'expenses';
    const formattedTotal = numeral(total / 100).format('$0,0.00');
    return (
        <div>
            {quantity > 0 &&
                <p>Viewing <b>{quantity}</b> {expenseWord} totalling <b>{formattedTotal}</b></p>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        ...selectExpenseSummary(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpenseSummary);
