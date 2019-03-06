//Get visible expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {

    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = (expense.description.toLowerCase()).includes(text.toLowerCase());

        //if is a match
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            //sort descending
            return a.createdAt < b.createdAt ? 1 : -1;
        }
            //sort descending
        if (sortBy === 'amount') {
            //if is true b comes first if is false a comes first
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

export default getVisibleExpenses;