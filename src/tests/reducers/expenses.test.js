import moment from 'moment';

import expenses from '../fixtures/expenses';
import expensesReducer from '../../reducers/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };

  const state = expensesReducer(expenses, action);
  //we are comparing the state result with the array confirming of
  // expenses[0] and expenses[2]
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const newExpense = {
    id: '4',
    description: 'farm bills',
    note: '',
    createdAt: moment(0),
    amount: 20000
  };

  const action = {
    type: 'ADD_EXPENSE',
    expense: newExpense
  };

  const state = expensesReducer(expenses, action);
  //expect(state.length).toBe(4);
  expect(state).toEqual([...expenses, newExpense]);
});

test('should edit an expense', () => {
  const amount = 10000;
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      amount
    }
  };

  const state = expensesReducer(expenses, action);
  expect(state[0].amount).toBe(amount);
});

test('should not edit and expense if id is not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      notes: 'a new note'
    }
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
