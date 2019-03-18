//1.- Import react, shallow, the component, and fixtures data

import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';
import selectExpensesSummary from '../../selectors/expenses-summary';

test('should render ExpensesSummary with no expenses', () => {
    const summary = selectExpensesSummary();

    const wrapper = shallow(<ExpensesSummary {...summary} />);
    expect(wrapper).toMatchSnapshot();

});

test('should render ExpensesSummary with summary of expenses', () => {
    const summary = selectExpensesSummary(expenses);

    const wrapper = shallow(<ExpensesSummary {...summary} />);
    expect(wrapper).toMatchSnapshot();
});
