/*
  calculateExpensesPerPerson
  Helper to sum all expenses per person
  @arg: expenses: [{name:'', amount: ''}]
*/
const calculateExpensesPerPerson = (expenses) => {
  const personsPerAmount = []
  for(let i = 0; i < expenses.length; i++) {
    const expense = expenses[i]
    
    if(!expense.name || !expense.amount) continue;

    const alreadyCalculated = personsPerAmount.find((person) => person.name === expense.name)
    if (!alreadyCalculated) {
      const amount = expenses.reduce(
        (previous, current) => (current.name === expense.name) ? previous + parseInt(current.amount) : previous, 0)
      personsPerAmount.push({name: expense.name, amount})
    }
  }

  return personsPerAmount
}

export default calculateExpensesPerPerson