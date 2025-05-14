import { createContext, useReducer } from "react";



const DUMMY_EXPENSE = [
    {
        id: 'e1',
        description: 'Market alışverişi',
        amount: 342.75,
        date: new Date('2024-11-15'),
    },
    {
        id: 'e2',
        description: 'Kahve',
        amount: 42.00,
        date: new Date('2025-04-12'),
    },
    {
        id: 'e3',
        description: 'Elektrik faturası',
        amount: 280.20,
        date: new Date('2025-03-10'),
    },
    {
        id: 'e4',
        description: 'Kitap alışverişi',
        amount: 96.40,
        date: new Date('2025-02-28'),
    },
    {
        id: 'e5',
        description: 'Toplu taşıma kart dolumu',
        amount: 120.00,
        date: new Date('2025-01-19'),
    },
    {
        id: 'e6',
        description: 'Kıyafet alışverişi',
        amount: 689.99,
        date: new Date('2024-12-22'),
    },
    {
        id: 'e7',
        description: 'Netflix aboneliği',
        amount: 99.99,
        date: new Date('2025-04-01'),
    },
    {
        id: 'e8',
        description: 'Telefon faturası',
        amount: 220.00,
        date: new Date('2025-03-05'),
    },
    {
        id: 'e9',
        description: 'Kırtasiye ürünleri',
        amount: 54.90,
        date: new Date('2025-03-15'),
    },
    {
        id: 'e10',
        description: 'Yemek siparişi',
        amount: 145.75,
        date: new Date('2025-05-01'),
    },
    {
        id: 'e11',
        description: 'Benzin',
        amount: 800.00,
        date: new Date('2025-04-25'),
    },
    {
        id: 'e12',
        description: 'Diş fırçası ve macunu',
        amount: 45.00,
        date: new Date('2025-04-18'),
    },
    {
        id: 'e13',
        description: 'Sinema bileti',
        amount: 88.00,
        date: new Date('2025-03-29'),
    },
    {
        id: 'e14',
        description: 'Kuru temizleme',
        amount: 110.50,
        date: new Date('2025-04-03'),
    },
    {
        id: 'e15',
        description: 'Spor salonu üyeliği',
        amount: 350.00,
        date: new Date('2025-01-10'),
    },
    {
        id: 'e16',
        description: 'Spor salonu üyeliği',
        amount: 350.00,
        date: new Date('2025-05-10'),
    },
];



export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { }
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];
        case 'UPDATE':
            const updateExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updateExpenseIndex];
            const updateItem = { ...updatableExpense, ...action.payload.data };
            const updateExpense = [...state];
            updateExpense[updateExpenseIndex] = updateItem;
            return updateExpense
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSE);

    function addExpense(expenseDate) {
        dispatch({ type: 'ADD', payload: expenseDate })
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
    }


    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return <ExpensesContext.Provider value={value}>
        {children}
    </ExpensesContext.Provider>
}

export default ExpensesContextProvider