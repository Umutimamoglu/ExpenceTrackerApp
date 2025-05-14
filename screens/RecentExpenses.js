
import { useContext } from "react";
import ExpenseOutPut from "../components/ExpensesOutPut/ExpensesOutPut";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";


export default function RecentExpenses() {

    const expensesCtx = useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter((expenses) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return (expenses.date >= date7DaysAgo) && (expenses.date <= today)
    })


    return <ExpenseOutPut expenses={recentExpenses} expensesPeriod={"Last 7 Days"}
        fallbackText={"No expenses registred for the last 7 days"}
    />
}

