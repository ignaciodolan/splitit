const calculateSettlement = (oweList) => {

    //->recorrer lista
    // si la persona A esta en negativo
    // -> encontrar a quien pagarle
    // 1 -> si persona B - persona A > 0
    // 2 --> anota el movimiento
    // 3 --> si persona A le queda deuda
    // 4 --> buscar al proximo y volver a 1
    // 5 -> si persona B - persona A < 0
    // 6 --> anota el movimiento
    // 7 --> cambia saldo persona A
    // 7 -> si persona A deuda =0 
    // 8 --> voy al siguiente
    // si esta positivo
    // seguir al proximo

    /*
      {name: "pela", owes: -40.75}
      {name: "doly", owes: 37.25}
      {name: "mateo", owes: -63.75}
      {name: "tato", owes: 67.25}
      total = 275
    */
    
    for (let i=0; i < oweList.length; i++) {
      const person = oweList[0]
      // person esta en positivo
      if (person.owe > 0) {
        continue;
      }
    }
}

export default calculateSettlement