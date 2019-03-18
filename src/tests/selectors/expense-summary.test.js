import selectExpenseTotal from '../../selectors/expense-summary';
import expenses from '../fixtures/expenses';


test('should return 0 if no expenses', () => {
    const result = selectExpenseTotal();

    expect(result.quantity).toBe(0);
    expect(result.total).toBe(0);
});


test('should correcly add up a single expense', () => {
    const result = selectExpenseTotal([expenses[1]]);

    expect(result.quantity).toBe(1);
    expect(result.total).toBe(expenses[1].amount);
});

test('should correcyly add up multiple expenses', () => {

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const result = selectExpenseTotal(expenses);

    expect(result.quantity).toBe(expenses.length);
    expect(result.total).toBe(total);
});