export default (expenses) => {
    if (!expenses) {
        return {
            quantity: 0,
            total: 0
        };
    }

    const total = expenses.reduce((sum, expense) => (sum + expense.amount), 0);

    const quantity = expenses.length;

    return { total, quantity };
};

