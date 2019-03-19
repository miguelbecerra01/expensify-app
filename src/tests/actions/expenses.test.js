import {
    startAddExpense,
    addExpense,
    editExpense,
    removeExpense,
    setExpenses,
    startSetExpenses,
    startRemoveExpense,
    startEditExpense

} from "../../actions/expenses";

import expenses from '../fixtures/expenses';
//let mock redux functions
import configureMockStore from 'redux-mock-store';
//middleware for redux
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });

    database.ref('expenses').set(expensesData).then(() => done());
});

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

test('should edit expense from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[1].id;
    const updates = {
        amount: 1000,
        notes: 'demo'
    };

    //edit from firestore 
    store.dispatch(startEditExpense(id, updates)).then(() => {

        //edit from redux
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });

        //check if the value has changed in firestore
        return database.ref(`expenses/${id}`).once('value');

    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    });
});


test("should setup add expense action object with provided values", () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: expenses[2]
    });
});


test('should remove expense from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[2].id;

    //call startRemoveExpense with the id for deleting it
    store.dispatch(startRemoveExpense({ id })).then(() => {

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });

        //get the expense with the id of the recently deleted expense
        return database.ref(`expenses/${id}`).once('value');


    }).then((snapshot) => {
        //the snapshot is null so, expect to be false.
        expect(snapshot.val()).toBeFalsy();
        done();
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


test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expeses from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });

        done();
    });
});