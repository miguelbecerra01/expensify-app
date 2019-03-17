import React from 'react';
//connect -> connect the component with the redux store
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';

import getVisibleExpenses from '../selectors/expenses';

//<ExpenseListItem key={index} {...expense}/> spread all the properties in the Expenselistcomponent
export const ExpenseList = (props) => (
    <div>
        {props.expenses.length === 0 ? (
            <p>No expenses yet ;-(</p>
        ) : (
                props.expenses.map((expense) => (
                    <ExpenseListItem key={expense.id} {...expense} />
                ))
            )}
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