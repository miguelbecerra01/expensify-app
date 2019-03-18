import selectExpensesTotal from '../../selectors/expenses-summary';
import expenses from '../fixtures/expenses';


test('should return 0 if no expenses', () => {
    const result = selectExpensesTotal();

    expect(result.quantity).toBe(0);
    expect(result.total).toBe(0);
});


test('should correcly add up a single expense', () => {
    const result = selectExpensesTotal([expenses[1]]);

    expect(result.quantity).toBe(1);
    expect(result.total).toBe(expenses[1].amount);
});

test('should correcyly add up multiple expenses', () => {
    const total = expenses[0].amount + expenses[1].amount + expenses[2].amount;

    const result = selectExpensesTotal(expenses);

    expect(result.quantity).toBe(expenses.length);
    expect(result.total).toBe(total);
});