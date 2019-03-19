import {
    startAddExpense,
    addExpense,
    editExpense,
    removeExpense
} from "../../actions/expenses";

import expenses from '../fixtures/expenses';

//let mock redux functions
import configureMockStore from 'redux-mock-store';
//middleware for redux
import thunk from 'redux-thunk';

import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);


test("shoud set up remove expense action object", () => {
    const action = removeExpense({
        id: "123asbc"
    });
    //if we use objects, we need to use toEqual
    //if we use booleans or primitives we use toBe
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: "123asbc"
    });
});

test("should set up edit expense action object", () => {
    const action = editExpense("id", {
        note: "demo note"
    });
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: "id",
        updates: {
            note: "demo note"
        }
    });
});

test("should setup add expense action object with provided values", () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: expenses[2]
    });
});

//asyncronous test cases -> use the done parameter
//jest will wait until find done()
test('should add expense to database and store', (done) => {
    const store = createMockStore({})
    const expenseData = {
        description: 'mouse',
        amount: 30,
        note: 'this is better',
        createdAt: 2000
    };
    //async call
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        //expect that actions[addExpense] got called
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        //return a promise
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');

    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done(); //forzing jest to wait until done is called
    })
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };
    //async call
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        //expect that actions[addExpense] got called
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        //return a promise
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');

    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done(); //forzing jest to wait until done is called
    })
});
