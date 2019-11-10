import React from 'react'
import AsciiTable from 'ascii-data-table'
import getExpenseListFromTextList from '../helpers/getExpenseListFromTextList'
import calculateExpensesPerPerson from '../helpers/calculateExpensesPerPerson'
import calculateOweList from '../helpers/calculateOweList'
import calculateSettlement from '../helpers/calculateSettlement'
import '../styles/main.css'

const Home = () => {
  // const [textList, setTextList] = React.useState(['14 pela', '106 doly', '5 mateo', '136 tato'])
  const [textList, setTextList] = React.useState([])
  const expenses = getExpenseListFromTextList(textList)
  const personsPerAmount = calculateExpensesPerPerson(expenses)
  const oweList = calculateOweList(personsPerAmount)
  // TODO
  const settleList = calculateSettlement(oweList)
  
  const totalSpent = expenses.reduce((previous, current) =>  previous + parseInt(current.amount), 0)
  const eachOwes = totalSpent / personsPerAmount.length
  
  console.log('expenses', expenses)
  console.log('personsPerAmount')
  console.table(personsPerAmount)
  console.log('total spent', totalSpent)
  console.log('eachOwes', eachOwes)
  console.log('oweList')
  console.table(oweList)

  const onKeyDown = (event) => {
    const {target, key} = event
    if (key === 'Enter') {
      const text = target.value
      const lines = text.split('\n')
      console.log(lines)
      setTextList(lines)
    }
  }

  const printExpenseTable = () => {
    const expenses = getExpenseListFromTextList(textList)
    const personsPerAmount = calculateExpensesPerPerson(expenses)
    const items = personsPerAmount.map((item) => [item.name, item.amount])
    return AsciiTable.table([['name', 'amount'], ...items])
  }

  const printOwesTable = () => {
    const expenses = getExpenseListFromTextList(textList)
    const personsPerAmount = calculateExpensesPerPerson(expenses)
    const oweList = calculateOweList(personsPerAmount)
    const items = oweList.map((item) => [item.name, item.owes])
    return AsciiTable.table([['name', 'owes'], ...items])
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="md:flex w-full h-screen">
        <textarea 
          className="bg-white focus:outline-none rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          placeholder="John 18"
          onKeyDown={onKeyDown}
        />
      </div>
      <div className="md:flex w-full ">
      {
          textList.length > 0 && (
            <>
              <p className="px-4">Total spent: {totalSpent}</p>
              <div className="md:block" >
                <p>Expenses:</p>
                <pre>{ printExpenseTable() }</pre>
              </div>
              <div className="md:block" >
                <p>Owe list:</p>
                <pre>{ printOwesTable() }</pre>
              </div>
            </>
          )
        }
      </div>      
    </div>
  )
}

export default Home