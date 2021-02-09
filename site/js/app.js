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
];
let word1 = listPicker(words);
let word2 = listPicker(words);

// pick random element from an array
function listPicker(array) {
  const listItem = Math.floor(Math.random() * Math.floor(array.length));
  return array[listItem];
}
console.log(word1);
console.log(word2.toUpperCase());
