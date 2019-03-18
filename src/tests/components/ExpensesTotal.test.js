//1.- Import react, shallow, the component, and fixtures data

import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesTotal } from '../../components/ExpensesTotal';
import expenses from '../fixtures/expenses';

test('should render ExpensesTotal if no expenses', () => {
    const summary = {
        total: 0,
        quantity: 0
    };
    const wrapper = shallow(<ExpensesTotal summary={summary} />);
    expect(wrapper).toMatchSnapshot();

});

test('should render ExpensesTotal summary expenses', () => {
    const summary = {
        total: 10000,
        quantity: 1
    };
    const wrapper = shallow(<ExpensesTotal summary={summary} />);
    expect(wrapper).toMatchSnapshot();
});
