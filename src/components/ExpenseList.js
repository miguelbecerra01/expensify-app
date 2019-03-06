import React from 'react';
//connect -> connect the component with the redux store
import { connect } from 'react-redux';


const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {props.expenses.length}
        <ul>
            <p>Text filter: {props.filters.text}</p> 
            {props.expenses.map((expense, index) => (
                <li key={index}>{expense.description}</li>
            ))}
        </ul>
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: state.expenses,
        filters: state.filters
    };
};

//Higher order component -> enhance the ExpenseList component adding the store of redux
//connect returns a function  and we need to set the component to propagate the store values in the props of the component
//the api needs to send the components in the second parentesis connect(function)(componentToPropagateStore)
//const ConnectedExpenseList = connect((state) => {
export default connect(mapStateToProps)(ExpenseList);

//export default ConnectedExpenseList;