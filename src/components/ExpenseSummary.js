import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectExpenseSummary from '../selectors/expense-summary';
import selectExpenses from '../selectors/expenses';
import { Link } from 'react-router-dom';

export const ExpenseSummary = ({ quantity, total }) => {
    const expenseWord = quantity <= 1 ? 'expense' : 'expenses';
    const formattedTotal = numeral(total / 100).format('$0,0.00');
    return (
        <div className="page-header">
            <div className="content-container" >
                <h1 className="page-header__title">
                    {/* {quantity > 0 && */}
                    Viewing <span>{quantity}</span> {expenseWord} totalling <span>{formattedTotal}</span>
                </h1>
                <div className="page-header__actions">
                    <Link to="/create" className="button" >Add Expense</Link></div>
            </div >
        </div >
    );
}

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        ...selectExpenseSummary(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpenseSummary);
