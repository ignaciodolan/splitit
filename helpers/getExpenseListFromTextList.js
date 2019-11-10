import moo from 'moo'

/*
  getExpenseListFromTextList
  Helper to extract amount and name of a list of texts
  @arg: textList: [{name:'', amount: ''}]
*/
const getExpenseListFromTextList = (textList) => {
    const lexer = moo.compile({
      WS:      /[ \t]+/,
      comment: /\/\/.*?$/,
      number:  /0|[1-9][0-9]*/,
      string:  /"(?:\\["\\]|[^\n"\\])*"/,
      text:  /[A-Za-z]+/,
      lparen:  '(',
      rparen:  ')',
      // keyword: ['while', 'if', 'else', 'moo', 'cows'],
      NL:      { match: /\n/, lineBreaks: true },
    })
  
    return textList.map((text) => {
      const expense = Array.from(lexer.reset(text))

      if (expense.length === 0) return
      
      const amount = expense.find((e) => e.type === 'number')
      const name = expense.find((e) => e.type === 'text')
      
      if (!amount || !name) return

      return ({
        name: name.value,
        amount: amount.value
      })
    }).filter(Boolean)  
  }

export default getExpenseListFromTextList