import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import getExpensesTotal from '../selectors/expenses-total';

export const ExpensesTotal = (props) => (
    <div>
        {props.summary.quantity > 0 &&
            <p>Listing {props.summary.quantity} expense{props.summary.quantity > 1 && 's'}
                with a total of
            <span> {numeral(props.summary.total / 100).format('$0,0.00')}</span></p>}

    </div>
);

const mapStateToProps = (state) => {
    return {
        summary: getExpensesTotal(state.expenses)
    };
};

export default connect(mapStateToProps)(ExpensesTotal);
