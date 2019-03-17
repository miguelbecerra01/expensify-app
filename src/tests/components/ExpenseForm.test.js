import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

//https://jestjs.io/docs/en/manual-mocks
//This test uses mock of the 'moment' module

test('should render ExpenseForm correctly', () => {
    //render the ExpenseForm component
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm correctly with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[2]} />);
    expect(wrapper).toMatchSnapshot();
});

//https://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html
//https://airbnb.io/enzyme/docs/api/ShallowWrapper/state.html
test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    //Create a snapshot before the error ocurrs
    expect(wrapper).toMatchSnapshot();

    //find the form element and simulate the submit event, and mocking the preventdefault
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });

    //assert if there is a state value called error and is greater than 0 characters
    expect(wrapper.state('error').length).toBeGreaterThan(0);

    //create a snapshot of the error
    expect(wrapper).toMatchSnapshot();

});

//https://airbnb.io/enzyme/docs/api/ShallowWrapper/at.html
test('should set description on input change', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
    const value = 'New Note';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
    const value = '23.50';//its a string field
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
    const value = '12.122';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe('');
});

//https://jestjs.io/docs/en/expect#tohavebeenlastcalledwitharg1-arg2-
test('should call onSubmit prop fro valid form submission', () => {
    //create a spy to mock the submit function
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });

    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});

//https://airbnb.io/enzyme/docs/api/ShallowWrapper/prop.html
test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    //second parentesis is for send the parameter of the onFocusChange eventwe add on the method 
    //onFocusChange the focused object
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toBe(focused);
});