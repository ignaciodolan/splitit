import calculateSettlement from './calculateSettlement';

describe('The `calculateSettlement` helper', () => {
  it('should return an array', () => {
    const actual = Array.isArray(calculateSettlement([]));
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should return no movements when its only one name', () => {
    const oweList = [{ name: 'luis', owes: 100 }];
    const actual = calculateSettlement(oweList);
    const expected = [];
    expect(actual).toEqual(expected);
  });

  it('should return a list of movements each person should do', () => {
    const oweList = [
      { name: 'Ignacio', owes: -50 },
      { name: 'Luis', owes: 50 },
    ];
    const actual = calculateSettlement(oweList);
    const expected = [['Ignacio', 'Luis', 50]];
    expect(actual).toEqual(expected);
  });

  it('should return a list of movements each person should do', () => {
    const oweList = [
      { name: 'Luis', owes: 100 },
      { name: 'Sofia', owes: -100 },
      { name: 'Ignacio', owes: 0 },
    ];
    const actual = calculateSettlement(oweList);
    const expected = [['Sofia', 'Luis', 100]];
    expect(actual).toEqual(expected);
  });
});
