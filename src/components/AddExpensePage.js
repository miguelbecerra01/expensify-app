import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses';


const AddExpensePage = (props) => (
    <div>
        <h1>Add Expense Page</h1>
        <ExpenseForm submitType={'Add'} onSubmit={(expense) => {
            props.dispatch(addExpense(expense));
            //go back to dashboard
            props.history.push('/');
        }} />
    </div>
);

export default connect()(AddExpensePage);
