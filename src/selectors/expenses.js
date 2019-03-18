//Get visible expenses
import moment from 'moment';

export default (expenses, { text, sortBy, startDate, endDate }) => {

    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
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

