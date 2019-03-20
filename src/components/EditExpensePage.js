import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    };
    onSubmit = (expense) => {
        this.setState(() => ({ isLoading: true }));

        new Promise((resolve, reject) => {
            resolve(this.props.startEditExpense(this.props.expense.id, expense));
        }).then(() => {
            this.props.history.push('/');
        });
    };
    onRemove = () => {
        this.setState(() => ({ isLoading: true }));
        new Promise((resolve, reject) => {
            resolve(this.props.startRemoveExpense({ id: this.props.expense.id }));
        }).then(() => {
            this.props.history.push('/');
        });
    };
    render() {
        return (
            <div>
                <h1>Edit Expense</h1>
                {this.state.isLoading ?
                    <div><img src="/images/loading.gif" width="100px" height="100px" /></div> :
                    <div>
                        <ExpenseForm
                            submitType={'Edit'}
                            expense={this.props.expense}
                            onSubmit={this.onSubmit} />
                        <button onClick={this.onRemove}>Remove</button>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => (expense.id === props.match.params.id))
});

const mapDispatchToProps = (dispatch) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);