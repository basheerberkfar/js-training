function normalizeNames(names) {
  return names.map((name) => {
    const cleaned = name.trim().toLowerCase();
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  });
}

function calculateCart(items) {
  return items.reduce(
    (total, item) => {
      if (!Number.isFinite(item.price) || !Number.isInteger(item.quantity) || item.price < 0 || item.quantity < 0) {
        throw new Error('Price and quantity must be valid non-negative numbers (quantity must be an integer)');
      }
      total.itemsCount += item.quantity;
      total.subtotal += item.price * item.quantity;
      return total;
    },
    { itemsCount: 0, subtotal: 0 }
  );
}

function groupByStatus(tasks) {
  return tasks.reduce((groups, task) => {
    const status = task.status;
    if (!Object.hasOwn(groups, status)) groups[status] = [];
    groups[status].push(task);
    return groups;
  }, Object.create(null));
}

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    else seen.add(value);
  }
  return [...duplicates];
}

function frequency(text) {
  const words = text.toLowerCase().match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) || [];
  return words.reduce((counts, word) => {
    counts[word] = (counts[word] || 0) + 1;
    return counts;
  }, Object.create(null));
}

const activeUsers = (users) => users.filter((user) => user.active);
const usersAboveAge = (users, age) => users.filter((user) => user.age > age);
const emailsOnly = (users) => users.map((user) => user.email);
const sortedAlphabetically = (emails) => [...emails].sort((a, b) => a.localeCompare(b));

function getActiveUserEmailsAboveAge(users, age) {
  return sortedAlphabetically(emailsOnly(usersAboveAge(activeUsers(users), age)));
}

function varLoopCallbacks() {
  const callbacks = [];
  for (var i = 0; i < 3; i++) {
    callbacks.push(() => i);
  }
  return callbacks.map((callback) => callback()); // [3, 3, 3]: one function-scoped variable
}

function letLoopCallbacks() {
  const callbacks = [];
  for (let i = 0; i < 3; i++) {
    callbacks.push(() => i);
  }
  return callbacks.map((callback) => callback()); // [0, 1, 2]: new binding per iteration
}

module.exports = {
  normalizeNames, calculateCart, groupByStatus, findDuplicates, frequency,
  activeUsers, usersAboveAge, emailsOnly, sortedAlphabetically,
  getActiveUserEmailsAboveAge, varLoopCallbacks, letLoopCallbacks
};
