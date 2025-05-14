/**
 * Return a random item from an array.
 *
 * @param {array} array  Array to look through
 * @returns Item at a random index
 */
const randomItemFrom = (array) => {
  return array[Math.floor(random() * array.length)];
};

/**
 * Return a random number
 *
 * Wrapper so we can do our own stuff later, if wanted
 *
 * @param {int} range  High range for random number
 * @returns A random
 */
const random = (range = 1) => {
  return Math.random() * range;
};

export { randomItemFrom, random };
