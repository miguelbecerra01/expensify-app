import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {

        new Promise((resolve, reject) => {
            resolve(this.props.startAddExpense(expense));
        }).then(() => {
            this.props.history.push('/');
        });
    };
    render() {
        return (
            <div>
                <h1>Add Expense Page</h1>
                <ExpenseForm submitType={'Add'} onSubmit={this.onSubmit} />
            </div>
        );
    }
}


//https://react-redux.js.org/using-react-redux/connect-mapdispatch#connect-dispatching-actions-with-mapdispatchtoprops
//Its a way to return your dispatch functions allowing you to abstract them 
//away of the component itseft
const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
