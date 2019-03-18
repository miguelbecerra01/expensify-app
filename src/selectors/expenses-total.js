const getExpensesTotal = (expenses) => {
    if (!expenses) {
        return {
            quantity: 0,
            total: 0
        };
    }

    const total = expenses.reduce((a, b) => {
        return a + b.amount;
    }, 0);

    const quantity = expenses.length;

    return { total, quantity };
};

export default getExpensesTotal;