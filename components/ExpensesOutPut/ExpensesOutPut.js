
import { View } from "react-native"
import ExpensesSummary from "./ExpensesSummary"
import ExpensesList from "./ExpensesList"


const DUMMY_EXPENSE = [

    {
        id: e1,
        description: 'a pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')

    },


    {
        id: e2,
        description: 'a pair of traouseros',
        amount: 69.99,
        date: new Date('2021-11-19')

    },

    {
        id: e3,
        description: 'muz',
        amount: 5.99,
        date: new Date('2021-6-2')

    },

    {
        id: e4,
        description: 'book',
        amount: 14.99,
        date: new Date('2024-4-30')

    },

    {
        id: e5,
        description: 'socks',
        amount: 9.99,
        date: new Date('2021-12-19')

    },
]


function ExpenseOutPut({ expenses, expensesPeriod }) {
    return <View>
        <ExpensesSummary expenses={DUMMY_EXPENSE} periodName={expensesPeriod} />
        <ExpensesList />

    </View>
}


export default ExpenseOutPut