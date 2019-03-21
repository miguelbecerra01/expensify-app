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
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    {this.state.isLoading ?
                        <div className="input-group__loader loader__image">
                            <img className="input-group__loader loader__image" src="/images/loader.gif" />
                        </div>
                        :
                        <ExpenseForm submitType={'Add'} isLoading={this.isLoading} onSubmit={this.onSubmit} />
                    }
                </div>

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
