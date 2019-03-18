import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

//its a class because we need to use component state
export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: false,
            submitType: props.submitType === 'Add' ? 'Add' : 'Edit'
        };
    }
    // state = {
    //     description: '',
    //     note: '',
    //     amount: '',
    //     createdAt: moment(),
    //     calendarFocused: false,
    //     error: false
    // };
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => {
            this.state.error = !description;
            return {
                description
            }
        });
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => {
                this.state.error = !amount;
                return {
                    amount
                };
            });
        }
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please provide description and amount.' }));
        } else {
            this.setState(() => ({ error: '' }));
            //call to the parent method in AddExpensePage, returning the value
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                //valueOf is from momentjs, because createdAt is a moment object
                //with valueOf returns in miliseconds 
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };
    render() {
        return (
            <div>

                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange} />
                    <input
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange} />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        firstDayOfWeek={1}
                        small={true}
                        isOutsideRange={() => false} />
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        onChange={this.onNoteChange}
                        value={this.state.note}
                    >

                    </textarea>
                    <button >{this.state.submitType} Expense</button>
                </form>
            </div>
        );
    }
}