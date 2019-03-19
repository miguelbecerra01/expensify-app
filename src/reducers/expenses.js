//Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            //return state.concat(action.expense);
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            //we need to destructure the array of objects in order to filter by id, otherwise it wont work    
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            //loop througth every item on the array
            return state.map((expense) => {
                if (expense.id === action.id) {
                    //spread operator for override the object with new values
                    //const expenseEdited = {...expense,...action.updates};
                    //return expenseEdited;
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            });
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
};


export default expensesReducer;