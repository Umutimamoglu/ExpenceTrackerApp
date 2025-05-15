
import { useContext, useEffect, useState } from "react";
import ExpenseOutPut from "../components/ExpensesOutPut/ExpensesOutPut";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../store/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";



export default function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const expensesCtx = useContext(ExpensesContext);



    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses)
            } catch (error) {
                setError('could not fetch expenses')
            }

            setIsFetching(false)

        }
        getExpenses();
    }, [])


    function errorHandler() {
        setError(null)
    }

    if (error && !isFetching) {
        return <ErrorOverlay messeage={error} onConfirm={errorHandler} />
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    const recentExpenses = expensesCtx.expenses.filter((expenses) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return (expenses.date >= date7DaysAgo) && (expenses.date <= today)
    })


    return <ExpenseOutPut expenses={recentExpenses} expensesPeriod={"Last 7 Days"}
        fallbackText={"No expenses registred for the last 7 days"}
    />
}

