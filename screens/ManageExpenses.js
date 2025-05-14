import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";

import { GlobalStyles } from "../constants/styles";

import { ExpensesContext } from "../store/expenses-context";
import ExpenseFrom from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import { storeExpense } from "../store/http";


function ManageExpenses({ route, navigation }) {

    const expensesCtx = useContext(ExpensesContext)

    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId

    const selectedExpense = expensesCtx.expenses.find(
        (expenses) => expenses.id === editedExpenseId
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing])

    function deleteExpenseHandler() {
        navigation.goBack();
        expensesCtx.deleteExpense(editedExpenseId)
    }

    function cancelHandler() {
        navigation.goBack();
    }


    function confirmHandler(expenseData) {

        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, expenseData
            )
        } else {
            storeExpense(expenseData)
            expensesCtx.addExpense(expenseData)
                ;
        }

        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpenseFrom submitButtonLabel={isEditing ? 'Update' : 'Add'} onCancle={cancelHandler}

                onSubmit={confirmHandler}
                defaultValues={selectedExpense}

            />

            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon={"trash"}
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>)
}

export default ManageExpenses;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },

})