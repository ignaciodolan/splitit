import React from 'react';
import AsciiTable from 'ascii-data-table';
import moo from 'moo';
import styled from 'styled-components';
import getExpenseListFromTextList from '../helpers/getExpenseListFromTextList';
import calculateExpensesPerPerson from '../helpers/calculateExpensesPerPerson';
import calculateOweList from '../helpers/calculateOweList';
import calculateSettlement from '../helpers/calculateSettlement';
import '../styles/main.css';

const Home = () => {
  const [textList, setTextList] = React.useState([]);
  console.log(textList);
  const lexer = moo.compile({
    WS: /[ \t]+/,
    comment: /\/\/.*?$/,
    number: /0|[1-9][0-9]*/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    text: /[A-Za-z]+/,
    lparen: '(',
    rparen: ')',
    // keyword: ['while', 'if', 'else', 'moo', 'cows'],
    NL: { match: /\n/, lineBreaks: true },
  });

  // const expenses = textList.map((text) => {
  //   const expense = Array.from(lexer.reset(text))

  //   if (expense.length === 0) return

  //   const amount = expense.find((e) => e.type === 'number')
  //   const name = expense.find((e) => e.type === 'text')

  //   if (!amount || !name) return

  //   return ({
  //     name: name.value,
  //     amount: amount.value
  //   })
  // }).filter(Boolean)
  const expenses = [];
  // const expenses = getExpenseListFromTextList(textList)
  const personsPerAmount = calculateExpensesPerPerson(expenses);
  const oweList = calculateOweList(personsPerAmount);
  // TODO
  const settleList = calculateSettlement(oweList);
  const totalSpent = expenses.reduce(
    (previous, current) => previous + parseInt(current.amount),
    0
  );

  const eachOwes = totalSpent / personsPerAmount.length;
  console.log('expenses', expenses);
  console.log('personsPerAmount');
  console.table(personsPerAmount);
  console.log('total spent', totalSpent);
  console.log('eachOwes', eachOwes);

  console.log('oweList');
  console.table(oweList);

  const onKeyDown = (event) => {
    const { target, key } = event;
    if (key === 'Enter') {
      const text = target.value;
      const lines = text.split('\n');
      console.log(lines);
      setTextList(lines);
    }
  };

  const printExpenseTable = () => {
    const expenses = getExpenseListFromTextList(textList);
    const personsPerAmount = calculateExpensesPerPerson(expenses);
    const items = personsPerAmount.map((item) => [item.name, item.amount]);
    return AsciiTable.table([['name', 'amount'], ...items]);
  };

  const printOwesTable = () => {
    const expenses = getExpenseListFromTextList(textList);
    const personsPerAmount = calculateExpensesPerPerson(expenses);
    const oweList = calculateOweList(personsPerAmount);
    const items = oweList.map((item) => [item.name, item.owes]);
    return AsciiTable.table([['name', 'owes'], ...items]);
  };

  return (
    <Section>
      <Container>
        <TextArea type="text" placeholder="John 18" onKeyDown={onKeyDown} />
      </Container>
      <Container>
        {textList.length > 0 && (
          <>
            <p className="px-4">Total spent: {totalSpent}</p>
            <div className="md:block">
              <p>Expenses:</p>
              <pre>{printExpenseTable()}</pre>
            </div>
            <div className="md:block">
              <p>Owe list:</p>
              <pre>{printOwesTable()}</pre>
            </div>
          </>
        )}
      </Container>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50%;
  min-height: 100vh;
`;

const TextArea = styled.textarea`
  font-size: 18px;
  border: none;
  outline: none;
  min-height: 100vh;
`;

export default Home;
