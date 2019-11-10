const calculateOweList = (personsPerAmount) => {
    const totalSpent = personsPerAmount.reduce((previous, current) =>  previous + parseInt(current.amount), 0)
    const eachOwes = totalSpent / personsPerAmount.length
    const oweList = []
    for(let i = 0; i < personsPerAmount.length; i++) {
      const person = personsPerAmount[i]
      oweList.push({name: person.name, owes: person.amount - eachOwes})
    }

    return oweList
  }

export default calculateOweList