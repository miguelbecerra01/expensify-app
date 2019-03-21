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
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    {this.state.isLoading ?
                        <div className="input-group__loader loader__image">
                            <img className="input-group__loader loader__image" src="/images/loader.gif" />
                        </div>
                        :
                        <div>
                            <ExpenseForm
                                submitType={'Edit'}
                                expense={this.props.expense}
                                onSubmit={this.onSubmit} />
                            <button className="button--secondary" onClick={this.onRemove}>Remove Expense</button>
                        </div>
                    }
                </div>
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