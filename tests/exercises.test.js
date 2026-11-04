const {
  normalizeNames, calculateCart, groupByStatus, findDuplicates, frequency,
  activeUsers, usersAboveAge, emailsOnly, sortedAlphabetically,
  getActiveUserEmailsAboveAge, varLoopCallbacks, letLoopCallbacks
} = require('../src/exercises');

describe('1. normalizeNames', () => {
  test('trims and capitalizes names', () => {
    expect(normalizeNames(['  ahmad ', 'SARA', 'oMaR'])).toEqual(['Ahmad', 'Sara', 'Omar']);
  });
  test('handles empty names', () => {
    expect(normalizeNames([' ', '  a  '])).toEqual(['', 'A']);
  });
});

describe('2. calculateCart', () => {
  test('counts quantities and calculates subtotal', () => {
    expect(calculateCart([{ name: 'Keyboard', price: 40, quantity: 2 }, { name: 'Mouse', price: 20, quantity: 1 }]))
      .toEqual({ itemsCount: 3, subtotal: 100 });
  });
  test('empty cart', () => {
    expect(calculateCart([])).toEqual({ itemsCount: 0, subtotal: 0 });
  });
  test.each([{ price: -1, quantity: 1 }, { price: 1, quantity: -2 }, { price: '10', quantity: 1 }, { price: 10, quantity: 1.5 }])('rejects invalid items: %p', (item) => {
    expect(() => calculateCart([item])).toThrow();
  });
});

describe('3. groupByStatus', () => {
  test('groups arbitrary statuses, without hardcoding', () => {
    const tasks = [{ id: 1, status: 'todo' }, { id: 2, status: 'done' }, { id: 3, status: 'todo' }, { id: 4, status: 'blocked' }];
    expect({ ...groupByStatus(tasks) }).toEqual({ todo: [tasks[0], tasks[2]], done: [tasks[1]], blocked: [tasks[3]] });
  });
  test('supports status named __proto__', () => {
    expect(groupByStatus([{ status: '__proto__' }])['__proto__']).toEqual([{ status: '__proto__' }]);
  });
});

describe('4. findDuplicates', () => {
  test('returns each duplicate once', () => {
    expect(findDuplicates([1, 2, 2, 3, 1, 1, 4])).toEqual([2, 1]);
  });
  test('no duplicates', () => {
    expect(findDuplicates(['a', 'b'])).toEqual([]);
  });
});

describe('5. frequency', () => {
  test('ignores casing and simple punctuation', () => {
    expect({ ...frequency('Hello, hello! World. WORLD?') }).toEqual({ hello: 2, world: 2 });
  });
  test('empty text', () => {
    expect(Object.keys(frequency('...'))).toEqual([]);
  });
});

describe('6. Compose small functions', () => {
  const users = [
    { name: 'Ziad', email: 'ziad@example.com', age: 25, active: true },
    { name: 'Ali', email: 'ali@example.com', age: 30, active: true },
    { name: 'Mona', email: 'mona@example.com', age: 40, active: false },
    { name: 'Sara', email: 'sara@example.com', age: 18, active: true }
  ];
  test('each helper does one thing', () => {
    expect(activeUsers(users)).toHaveLength(3);
    expect(usersAboveAge(users, 25).map((u) => u.name)).toEqual(['Ali', 'Mona']);
    expect(emailsOnly([users[0]])).toEqual(['ziad@example.com']);
    expect(sortedAlphabetically(['z@example.com', 'a@example.com'])).toEqual(['a@example.com', 'z@example.com']);
  });
  test('composes filtering, mapping, sorting', () => {
    expect(getActiveUserEmailsAboveAge(users, 20)).toEqual(['ali@example.com', 'ziad@example.com']);
  });
});

describe('7. Scope bug', () => {
  test('var shares loop binding', () => {
    expect(varLoopCallbacks()).toEqual([3, 3, 3]);
  });
  test('let makes an iteration binding', () => {
    expect(letLoopCallbacks()).toEqual([0, 1, 2]);
  });
});
