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
  const expenses = getExpenseListFromTextList(textList) || [];
  const personsPerAmount = calculateExpensesPerPerson(expenses);
  const oweList = calculateOweList(personsPerAmount);
  const settlementList = calculateSettlement(oweList);
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
  console.log('settlementList');
  console.table(settlementList);

  const onKeyDown = (event) => {
    const { target, key } = event;
    if (key === 'Enter') {
      const text = target.value;
      const lines = text.split('\n');
      setTextList(lines);
    }
  };

  const printExpenseTable = (personsPerAmount) => {
    const items = personsPerAmount.map((item) => [item.name, item.amount]);
    return AsciiTable.table([['name', 'amount'], ...items]);
  };

  const printOwesTable = (expenses) => {
    const personsPerAmount = calculateExpensesPerPerson(expenses);
    const oweList = calculateOweList(personsPerAmount);
    const items = oweList.map((item) => [item.name, item.owes]);
    return AsciiTable.table([['name', 'owes'], ...items]);
  };

  const printPaymentTable = (settlementList) =>
    settlementList.map((movement) => {
      const [person1, person2, amount] = movement;
      return <p>{`${person1} owes ${person2} $${amount}`}</p>;
    });

  return (
    <Section>
      <Container>
        <TextArea type="text" placeholder="John 18" onKeyDown={onKeyDown} />
      </Container>
      <Container>
        {textList.length > 0 && (
          <>
            <p className="px-4">Total spent: {totalSpent}</p>
            <div>
              <p>Expenses:</p>
              <pre>{printExpenseTable(personsPerAmount)}</pre>
            </div>
            <div>
              <p>Payment list:</p>
              {printPaymentTable(settlementList)}
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
