import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';


export const ExpenseListItem = ({ id, description, amount, createdAt }) => (
    <div>
        <Link to={`/edit/${id}`}><h3>{description}</h3></Link>
        <p>{numeral(amount / 100).format('$0,0.00')} - {moment(createdAt).format('DD MMMM YYYY')}</p>
    </div>
);

//we dont need anything of the state, we only need the dispatch()
export default connect()(ExpenseListItem);