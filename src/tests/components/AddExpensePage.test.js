import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

//https://jestjs.io/docs/en/api#beforeeachfn-timeout


//Runs a function before each of the tests in this file runs. 
let addExpenseSpy, historySpy, wrapper;

beforeEach(() => {
    addExpenseSpy = jest.fn(); //tells that is a jest function to mock
    historySpy = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage addExpense={addExpenseSpy} history={historySpy} />);
});

test('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
    expect(addExpenseSpy).toHaveBeenLastCalledWith(expenses[1]);
});