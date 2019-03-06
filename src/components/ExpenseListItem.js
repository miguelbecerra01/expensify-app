import React from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses';
import {Link} from 'react-router-dom';

const ExpenseListItem = ({ dispatch, id, description, amount, createdAt }) => (
    <div>
        <Link to={`/edit/${id}`}><h3>{description}</h3></Link>
        <p>amount ${amount}, created at: {createdAt}</p>
        <button onClick={() => {
            dispatch(removeExpense({ id }));
        }}> remove</button>
    </div>
);

//we dont need anything of the state, we only need the dispatch()
export default connect()(ExpenseListItem);