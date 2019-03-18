//1.- Import react, shallow, the component, and fixtures data

import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';
import expenses from '../fixtures/expenses';

test('should render ExpenseSummary with no expenses', () => {
    const wrapper = shallow(<ExpenseSummary quantity={0} total={0} />);
    expect(wrapper).toMatchSnapshot();

});

test('should render ExpenseSummary with one expense', () => {
    const wrapper = shallow(<ExpenseSummary quantity={1} total={1000} />);
    expect(wrapper).toMatchSnapshot();

});

test('should render ExpenseSummary with summary of expenses', () => {
    const wrapper = shallow(<ExpenseSummary quantity={2} total={2000} />);
    expect(wrapper).toMatchSnapshot();
});
