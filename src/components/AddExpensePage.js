import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    };
    onSubmit = (expense) => {
        this.setState(() => ({ isLoading: true }));

        new Promise((resolve, reject) => {
            resolve(this.props.startAddExpense(expense));
        }).then(() => {
            this.props.history.push('/');
        });
    };
    render() {
        return (
            <div>
                <h1>Add Expense Pages</h1>
                {this.state.isLoading ?
                    <div><img src="/images/loading.gif" width="100px" height="100px" /></div> :
                    <ExpenseForm submitType={'Add'} isLoading={this.isLoading} onSubmit={this.onSubmit} />
                }

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
