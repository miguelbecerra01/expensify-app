import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectExpensesSummary from '../selectors/expenses-summary';

export const ExpensesSummary = (props) => (
    <div>
        {props.quantity > 0 &&
            <p>Listing <b>{props.quantity}</b> expense{props.quantity > 1 && 's'}
                <span> with a total of </span>
                <b>{numeral(props.total / 100).format('$0,0.00')}</b></p>}

    </div>
);

const mapStateToProps = (state) => {
    return {
        ...selectExpensesSummary(state.expenses)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);
