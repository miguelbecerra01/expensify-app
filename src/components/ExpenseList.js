import React from 'react';
//connect -> connect the component with the redux store
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';

import getVisibleExpenses from '../selectors/expenses';

//<ExpenseListItem key={index} {...expense}/> spread all the properties in the Expenselistcomponent
export const ExpenseList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
            {
                props.expenses.length === 0 ? (
                    <div className="list-item list-item--message"><span>No expenses yet ;-(</span></div>
                ) : (
                        props.expenses.map((expense) => (
                            <ExpenseListItem key={expense.id} {...expense} />
                        ))
                    )
            }
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    };
};

//Higher order component -> enhance the ExpenseList component adding the store of redux
//connect returns a function  and we need to set the component to propagate the store values in the props of the component
//the api needs to send the components in the second parentesis connect(function)(componentToPropagateStore)
//const ConnectedExpenseList = connect((state) => {
export default connect(mapStateToProps)(ExpenseList);

//export default ConnectedExpenseList;