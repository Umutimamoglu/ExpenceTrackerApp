
import { View, StyleSheet, Text } from "react-native"
import ExpensesSummary from "./ExpensesSummary"
import ExpensesList from "./ExpensesList"
import { GlobalStyles } from "../../constants/styles"


function ExpenseOutPut({ expenses, expensesPeriod, fallbackText }) {

    let content = <Text style={styles.infoText}>{fallbackText}</Text>


    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />
    }

    return (<View style={styles.container}>
        <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
        {content}


    </View>

    )
}


export default ExpenseOutPut


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
})