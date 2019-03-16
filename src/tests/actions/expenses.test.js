import {
    addExpense,
    editExpense,
    removeExpense
} from "../../actions/expenses";

test("shoud set up remove expense action object", () => {
    const action = removeExpense({
        id: "123asbc"
    });
    //if we use objects, we need to use toEqual
    //if we use booleans or primitives we use toBe
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: "123asbc"
    });
});

test("should set up edit expense action object", () => {
    const action = editExpense("id", {
        note: "demo note"
    });
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: "id",
        updates: {
            note: "demo note"
        }
    });
});

test("should setup add expense action object with provided values", () => {
    const expenseData = {
        description: "Rent",
        amount: 1095000,
        createdAt: 1000,
        note: "This was the last mont rent"
    };

    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test("shoud setup add expense action object with default values", () => {
    const action = addExpense();
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            description: "",
            note: "",
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    });
});