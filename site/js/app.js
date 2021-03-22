/* eslint-disable no-use-before-define */
// sample array
const words = [
  'house',
  'serve',
  'miner',
  'cower',
  'worry',
  'bowel',
  'chart',
  'plead',
  'snack',
  'amuse',
  'self',
  'hair',
  'whip',
  'copy',
  'cane',
  'rich',
  'just',
  'date',
  'cafe',
  'quit',
];
const randomNumberObject = {
  a: getRandomNumber(0, 9),
  b: getRandomNumber(0, 9),
};
const word1 = listPicker(words);
const word2 = listPicker(words);
const randomNumber = `${randomNumberObject.a}${randomNumberObject.b}`;

// pick random element from an array
function listPicker(array) {
  const listItem = Math.floor(Math.random() * Math.floor(array.length));
  //validate list item
  if (listItem.length > 4) {
    listItem = Math.floor(Math.random() * Math.floor(array.length));
  } else {
    return array[listItem];
  }
}

// generate random number by passing in a high and a low number
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(word1);
console.log(word2.toUpperCase());
console.log(randomNumber);
