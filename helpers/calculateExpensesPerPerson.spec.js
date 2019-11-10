import calculateExpensesPerPerson from './calculateExpensesPerPerson'

describe('The `calculateExpensesPerPerson` helper', () => {
  it('should return an array', () => {
    const actual = Array.isArray(calculateExpensesPerPerson([]))
    const expected = true
    expect(actual).toEqual(expected)
  })

  it('should avoid expenses that dont have name and amount', () => {
    const expenses = [{notName: 'notAName', notAnAmount: 100}]
    const actual = calculateExpensesPerPerson(expenses)
    const expected = []
    expect(actual).toEqual(expected)
  })

  it('should return a list of total expenses per person with all positive values', () => {
    const expenses = [{name: 'Ignacio', amount: 100}, {name: 'Ignacio', amount: 15}]
    const actual = calculateExpensesPerPerson(expenses)
    const expected = [{name: 'Ignacio', amount: 115}]
    expect(actual).toEqual(expected)
  })

  it('should return a list of total expenses per person with all negative values', () => {
    const expenses = [{name: 'Ignacio', amount: -100}, {name: 'Ignacio', amount: -15}]
    const actual = calculateExpensesPerPerson(expenses)
    const expected = [{name: 'Ignacio', amount: -115}]
    expect(actual).toEqual(expected)
  })

  it('should return a list of total expenses per person with positive and negative values', () => {
    const expenses = [{name: 'Ignacio', amount: 100}, {name: 'Ignacio', amount: -15}]
    const actual = calculateExpensesPerPerson(expenses)
    const expected = [{name: 'Ignacio', amount: 85}]
    expect(actual).toEqual(expected)
  })

  it('should return a list of total expenses per person with positive and negative values', () => {
    const expenses = [{name: 'Ignacio', amount: 100}, {name: 'Ignacio', amount: 15}, {name: 'Sofia', amount: 20}]
    const actual = calculateExpensesPerPerson(expenses)
    const expected = [{name: 'Ignacio', amount: 115}, {name: 'Sofia', amount: 20}]
    expect(actual).toEqual(expected)
  })

  it('should convert all amount strings into int', () => {
    const expenses = [{name: 'Ignacio', amount: '100'}, {name: 'Ignacio', amount: '15'}, {name: 'Sofia', amount: '20'}]
    const actual = calculateExpensesPerPerson(expenses)
    const expected = [{name: 'Ignacio', amount: 115}, {name: 'Sofia', amount: 20}]
    expect(actual).toEqual(expected)
  })
})
