import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';


test('should return 0 if no expenses', () => {
    const summary = {
        quantity: 0,
        total: 0
    };

    const result = getExpensesTotal();
    expect(result).toEqual(summary);

});


test('should correcly add up a single expense', () => {
    const summary = {
        quantity: 1,
        total: expenses[1].amount
    };

    const result = getExpensesTotal([expenses[1]]);
    expect(result).toEqual(summary);
});

test('should correcyly add up multiple expenses', () => {
    const summary = {
        quantity: expenses.length,
        total: expenses[0].amount + expenses[1].amount + expenses[2].amount
    };

    const result = getExpensesTotal(expenses);
    expect(result).toEqual(summary);
});