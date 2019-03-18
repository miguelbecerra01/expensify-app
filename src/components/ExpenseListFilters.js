import React from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import { connect } from 'react-redux';
import moment from 'moment';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };
    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    };
    onTextChange = (e) => {
        //dispatch is the trigger for setting actions
        //when a keystroke in the input onChange changes and calls to
        //props.dispatch
        this.props.setTextFilter(e.target.value);
    };
    onSortChange = (e) => {
        if (e.target.value === 'date') {
            this.props.sortByDate(e.target.value);
        } else if (e.target.value === 'amount') {
            this.props.sortByAmount(e.target.value);
        }
    };
    render() {
        return (
            <div>
                <input type="text" value={this.props.filters.text} onChange={this.onTextChange} />
                <select
                    value={this.props.filters.sortBy}
                    onChange={this.onSortChange}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    startDateId={''}
                    endDate={this.props.filters.endDate}
                    endDateId={''}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    firstDayOfWeek={1}
                    small={true}
                    isOutsideRange={() => false}
                    showClearDates={true}
                    displayFormat={"DD/MM/YYYY"}
                />
            </div>
        );
    }
};


const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});


export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);