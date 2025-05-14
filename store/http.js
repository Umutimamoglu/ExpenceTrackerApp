import axios from "axios";

export function storeExpense(expenseData) {
    axios.post('https://expencetrackerapp-c0715-default-rtdb.firebaseio.com/expenses.json',
        expenseData
    );
}