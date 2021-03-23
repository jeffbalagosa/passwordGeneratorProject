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
let randomNumberObject = {
  a: getRandomDigit(0, 9),
  b: getRandomDigit(0, 9),
};
let word1 = listPicker(words);
let word2 = listPicker(words);
let number;

//randomize number fore every list item
function randomizeNumber() {
  randomNumberObject = {
    a: getRandomDigit(0, 9),
    b: getRandomDigit(0, 9),
  };
  number = `${randomNumberObject.a}${randomNumberObject.b}`;
  return number;
}

// pick random element from an array
function listPicker(array) {
  const listItem = Math.floor(Math.random() * Math.floor(array.length));
  return array[listItem];
}

// generate random number by passing in a high and a low number
function getRandomDigit(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//validate word length
function validWord(str) {
  while (str.length > 4) {
    str = listPicker(words);
  }
  return str;
}

function buildSuggestionList() {
  $('.pwList').html(
    `<div>
      <ul>
      <li>${validWord(word1)}.${validWord(
      word2
    ).toUpperCase()}.${randomizeNumber()}</li>
    <li>${validWord(word1)}.${validWord(
      word2
    ).toUpperCase()}.${randomizeNumber()}</li>
    <li>${validWord(word1)}.${validWord(
      word2
    ).toUpperCase()}.${randomizeNumber()}</li><li>${validWord(
      word1
    )}.${validWord(
      word2
    ).toUpperCase()}.${randomizeNumber()}</li><li>${validWord(
      word1
    )}.${validWord(
      word2
    ).toUpperCase()}.${randomizeNumber()}</li><li>${validWord(
      word1
    )}.${validWord(
      word2
    ).toUpperCase()}.${randomizeNumber()}</li><li>${validWord(
      word1
    )}.${validWord(
      word2
    ).toUpperCase()}.${randomizeNumber()}</li><li>${validWord(
      word1
    )}.${validWord(
      word2
    ).toUpperCase()}.${randomizeNumber()}</li><li>${validWord(
      word1
    )}.${validWord(
      word2
    ).toUpperCase()}.${randomizeNumber()}</li><li>${validWord(
      word1
    )}.${validWord(word2).toUpperCase()}.${randomizeNumber()}
      </ul>
    </div>`
  );
}

console.log(validWord(word1));
console.log(validWord(word2).toUpperCase());
console.log(randomizeNumber());

buildSuggestionList();

//get passwords on button click
$('.get-pass').on('click', function () {
  //place jquery function for dom manipulation here.
  buildSuggestionList();
});
