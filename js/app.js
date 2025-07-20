/* eslint-disable no-use-before-define */

//randomize number for every list item
function randomizeNumber(digits) {
  let numArr = [];
  while (numArr.length < digits) {
    numArr.push(chance.integer({ min: -0, max: 9 }));
  }
  return numArr.join('');
}

//pick a valid random word from the array
async function randomWordPicker(minWordLength, maxWordLength) {
  let suitableWord = null;
  while (suitableWord === null) {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word?number=50');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const words = await response.json();
      const suitableWords = words.filter(word => word.length >= minWordLength && word.length <= maxWordLength);

      if (suitableWords.length > 0) {
        suitableWord = chance.pickone(suitableWords);
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      return "error";
    }
  }
  return suitableWord;
}

const randomSymbol = () => {
  const symbols = ['.', '!', '?', '%', ',', '@', '^', ':', '-', '_', ';'];
  return chance.pickone(symbols);
};

const passPhrase = async (wordCount, numDigits, minWordLength, maxWordLength) => {
  const wordArr = [];
  let password = '';

  // Since randomWordPicker is now async, we need to await it.
  // We can generate all the words in parallel.
  const wordPromises = [];
  for (let i = 0; i < wordCount; i++) {
    wordPromises.push(randomWordPicker(minWordLength, maxWordLength));
  }

  const randomWords = await Promise.all(wordPromises);

  // randomize 1st word in array to be all caps or all lowercase, then alternate case for next word.
  if (Math.random() < 0.5) {
    for (let i = 0; i < randomWords.length; i++) {
      if (i % 2 !== 0) {
        wordArr.push(randomWords[i].toUpperCase());
      } else {
        wordArr.push(randomWords[i]);
      }
    }
  } else {
    for (let i = 0; i < randomWords.length; i++) {
      if (i % 2 === 0) {
        wordArr.push(randomWords[i].toUpperCase());
      } else {
        wordArr.push(randomWords[i]);
      }
    }
  }

  wordArr.unshift(randomizeNumber(numDigits));
  wordArr.push(randomizeNumber(numDigits));
  password = `${wordArr.join(`${randomSymbol()}`)}`;
  return password;
};

//build list item html for dom
const listBuilder = async (wordCount, numDigits, minWordLength, maxWordLength, listItemCount) => {
  const passwordPromises = [];
  for (let i = 0; i < listItemCount; i++) {
    passwordPromises.push(passPhrase(wordCount, numDigits, minWordLength, maxWordLength));
  }
  const passwords = await Promise.all(passwordPromises);
  const list = passwords.map(p => `<dt>${p}</dt>`);
  return list.join('');
};

//add generated html to index.html
async function buildSuggestionList() {
  const numWords = $('#numWords').val();
  const numDigits = $('#numDigits').val();
  const minWordLength = $('#minWordLength').val();
  const maxWordLength = $('#maxWordLength').val();
  // Show a loading message
  $('.pwList').html('<p>Generating passwords...</p>');
  try {
    const listHtml = await listBuilder(numWords, numDigits, minWordLength, maxWordLength, 10);
    $('.pwList').html(
      `<div>
        <dl>
        ${listHtml}
        </dl>
      </div>`
    );
  } catch (error) {
    $('.pwList').html('<p>Could not generate passwords. Please try again.</p>');
    console.error(error);
  }
}

buildSuggestionList();

//get passwords on button click
$('.get-pass').on('click', function () {
  //place jquery function for dom manipulation here.
  buildSuggestionList();
});
