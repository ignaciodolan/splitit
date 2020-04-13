/* 
  calculateSettlement
  Helper to calculate the movements between persons givent the 
  balance list "oweList"
  @arg: oweList: [{name:'', owes: ''}]
*/
const calculateSettlement = (oweList) => {
  const sortedPeople = oweList
    .sort((personA, personB) => personA.owes - personB.owes)
    .map((person) => person.name);
  const sortedValuesPaid = oweList
    .sort((personA, personB) => personA.owes - personB.owes)
    .map((person) => person.owes);

  // Taken from
  // https://stackoverflow.com/questions/974922/algorithm-to-share-settle-expenses-among-a-group
  let i = 0;
  let j = sortedPeople.length - 1;
  let debt;
  const movements = [];
  while (i < j) {
    debt = Math.min(-sortedValuesPaid[i], sortedValuesPaid[j]);
    sortedValuesPaid[i] += debt;
    sortedValuesPaid[j] -= debt;
    movements.push([sortedPeople[i], sortedPeople[j], debt]);
    if (sortedValuesPaid[i] === 0) {
      i++;
    }

    if (sortedValuesPaid[j] === 0) {
      j--;
    }
  }

  return movements;
};

export default calculateSettlement;
