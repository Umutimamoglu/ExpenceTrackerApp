
import { useContext } from "react";
import ExpenseOutPut from "../components/ExpensesOutPut/ExpensesOutPut";
import { ExpensesContext } from "../store/expenses-context";


function AllExpenses() {

    const expensesCtx = useContext(ExpensesContext)

    return <ExpenseOutPut expenses={expensesCtx.expenses} expensesPeriod={"Total"}
        fallbackText={"No registred expenses found!!"}
    />
}

export default AllExpenses;