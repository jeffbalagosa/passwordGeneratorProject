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
let word;
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

//pick a valid random word from the array
function randomizeWord() {
  word = listPicker(words);
  while (word.length > 4) {
    word = listPicker(words);
  }
  return word;
}

// generate random number by passing in a high and a low number
function getRandomDigit(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildSuggestionList() {
  $('.pwList').html(
    `<div>
      <hr />
      <ul>
      <li>${randomizeWord()}.${randomizeWord().toUpperCase()}.${randomizeNumber()}</li>
      <li>${randomizeWord()}.${randomizeWord().toUpperCase()}.${randomizeNumber()}</li>
      <li>${randomizeWord()}.${randomizeWord().toUpperCase()}.${randomizeNumber()}</li>
      <li>${randomizeWord()}.${randomizeWord().toUpperCase()}.${randomizeNumber()}</li>
      <li>${randomizeWord()}.${randomizeWord().toUpperCase()}.${randomizeNumber()}</li>
      <li>${randomizeWord()}.${randomizeWord().toUpperCase()}.${randomizeNumber()}</li>
      <li>${randomizeWord()}.${randomizeWord().toUpperCase()}.${randomizeNumber()}</li>
      <li>${randomizeWord()}.${randomizeWord().toUpperCase()}.${randomizeNumber()}</li>
      <li>${randomizeWord()}.${randomizeWord().toUpperCase()}.${randomizeNumber()}</li>
      <li>${randomizeWord()}.${randomizeWord().toUpperCase()}.${randomizeNumber()}</li>
      </ul>
      <hr />
    </div>`
  );
}

buildSuggestionList();

//get passwords on button click
$('.get-pass').on('click', function () {
  //place jquery function for dom manipulation here.
  buildSuggestionList();
});
