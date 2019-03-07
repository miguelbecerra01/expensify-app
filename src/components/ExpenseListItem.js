import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';


const ExpenseListItem = ({ id, description, amount, createdAt }) => (
    <div>
        <Link to={`/edit/${id}`}><h3>{description}</h3></Link>
        <p>amount ${amount/100}, created at: {moment(createdAt).format('MMMM Do, YYYY')}</p>        
    </div>
);

//we dont need anything of the state, we only need the dispatch()
export default connect()(ExpenseListItem);