import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount } from '../actions/filters';

const ExpenseListFilters = (props) => (
    <div>
        <input type="text" value={props.filters.text} onChange={(e) => {
            //dispatch is the trigger for setting actions
            //when a keystroke in the input onChange changes and calls to
            //props.dispatch
            props.dispatch(setTextFilter(e.target.value));
        }} />
        <select
            value={props.filters.sortBy}
            onChange={(e) => {
                if (e.target.value === 'date') {
                    props.dispatch(sortByDate(e.target.value));
                } else if (e.target.value === 'amount') {
                    props.dispatch(sortByAmount(e.target.value));
                }
            }}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
        </select>
    </div>
);

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);