//https://www.npmjs.com/package/uuid
import uuid from 'uuid';
import database from '../firebase/firebase';

//Actions 

//steps-> Syncronous calls
//component calls action generator
//action generator returns object
//component dispatches object
//redux store changes

//steps -> Asyncronous calls (save to firebase)
//component calls action generator
//action generator returns function
//component dispatches function (?) using a redux-module redux-thunk
//(a thunk is a subroutine used to inject an additional calculation into another subroutine)
//function runs (has the ability to dispatch other actions and do whatever it wants)


// ADD_EXPENSE
// export const addExpense = (
//     { description = '',
//         note = '',
//         amount = 0,
//         createdAt = 0
//     } = {}
// ) => ({
//     type: 'ADD_EXPENSE',
//     expense: {
//         id: uuid(),
//         description,
//         note,
//         amount,
//         createdAt
//     }
// });

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});


export const startAddExpense = (expenseData = {}) => {
    //will work only because we added the redux middleware using redux-thunk
    //return is used to proportionate the component a promise
    return (dispatch, getState) => {
        //get the id of the looged in user
        const uid = getState().auth.uid;

        //extract and create the parameters from the object expenseData -> destructuring
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;

        const expense = { description, note, amount, createdAt };

        //with return we add the hability to make promises chaining
        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};


// REMOVE_EXPENSE 
export const startRemoveExpense = ({ id }) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({ id }));
        });
    };
};


//with parentesis after the arrow function means that returns the object
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

//edit expense from firebase
export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            //edit from redux store
            dispatch(editExpense(id, updates));
        });

    };
};

//SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

//START_SET_EXPENSES -> Fetch the expenses from firebase
export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        //with return we give access to 'then' in app.js 
        return database.ref(`users/${uid}/expenses`)
            .once('value')
            .then((snapshot) => {
                const expenses = [];
                snapshot.forEach((childSnapshot) => {
                    expenses.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                dispatch(setExpenses(expenses));
            });
    };
};

