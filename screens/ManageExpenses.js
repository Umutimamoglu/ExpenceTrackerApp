import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import { GlobalStyles } from "../constants/styles";

import { ExpensesContext } from "../store/expenses-context";
import ExpenseFrom from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import { deleteExpense, storeExpense, updateExpense } from "../store/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";



function ManageExpenses({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setErorr] = useState();
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

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        try {
            await deleteExpense(editedExpenseId);
            expensesCtx.deleteExpense(editedExpenseId)
            navigation.goBack();
        } catch (error) {
            setErorr("Colud not delte expense - plsease try again later!");
            setIsSubmitting(false);
        }


    }

    function cancelHandler() {
        navigation.goBack();
    }


    async function confirmHandler(expenseData) {

        setIsSubmitting(true);
        try {
            if (isEditing) {
                expensesCtx.updateExpense(editedExpenseId, expenseData
                )
                await updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData)
                expensesCtx.addExpense({ ...expenseData, id: id })
                    ;
            }

            navigation.goBack();
        } catch (error) {
            setErorr('Could not sade data - please try again later');
            setIsSubmitting(false)
        }
    }

    function errorHandler() {
        setErorr(null);
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay messeage={error} onConfirm={errorHandler} />
    }

    if (isSubmitting) {
        return <LoadingOverlay />;
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