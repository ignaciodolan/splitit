import getExpenseListFromTextList from './getExpenseListFromTextList';

describe('The `getExpenseListFromTextList` helper', () => {
  it('should return an array', () => {
    const actual = Array.isArray(
      getExpenseListFromTextList(['1 john', '2 jim'])
    );
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should return an array with parsed objects', () => {
    const actual = getExpenseListFromTextList(['1 john', '2 jim']);
    const expected = [
      { name: 'john', amount: '1' },
      { name: 'jim', amount: '2' },
    ];
    expect(actual).toEqual(expected);
  });

  it('should return an omit empty values array when parsing to objects', () => {
    const actual = getExpenseListFromTextList(['1 john', '2 jim', '']);
    const expected = [
      { name: 'john', amount: '1' },
      { name: 'jim', amount: '2' },
    ];
    expect(actual).toEqual(expected);
  });

  it('should return an omit values that doesnt have expense and name', () => {
    const actual = getExpenseListFromTextList(['john', '2 jim']);
    const expected = [{ name: 'jim', amount: '2' }];
    expect(actual).toEqual(expected);
  });
});
